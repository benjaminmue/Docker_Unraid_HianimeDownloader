# Security Documentation

This document outlines the security measures implemented in HiAni DL WebGUI to protect against common web application vulnerabilities.

## 🏠 Deployment Context: LAN/Home Use

**HiAni DL is designed for internal, trusted network (LAN) deployment only.**

> ⚠️ **Important:** This application is **NOT hardened for public internet exposure**. It should only be deployed on:
> - Home networks (192.168.x.x, 10.x.x.x)
> - Private corporate LANs
> - Isolated Docker networks
>
> **Never expose port 8080 directly to the internet (WAN) without:**
> - HTTPS reverse proxy (nginx, Traefik, Caddy)
> - Strong authentication
> - Rate limiting
> - Firewall rules
> - Regular security updates

### Security Levels by Deployment

| Deployment Type | Required Security | Optional Security |
|----------------|-------------------|-------------------|
| **Home LAN (single user)** | Input validation, injection prevention | URL allowlist, authentication |
| **Home LAN (family)** | Input validation, injection prevention | URL allowlist, basic auth |
| **Corporate LAN** | All security features | Consider additional firewall rules |
| **Public Internet** | **NOT RECOMMENDED** | Use commercial services instead |

### What This Means for You

**If you're running on a home network:**
- ✅ Core security features (injection prevention, path traversal) are **always enabled**
- ⚙️ Optional features (URL allowlist, authentication) can be **disabled** if only trusted users have access
- 🏠 Accessing via `http://192.168.x.x:8080` is **fine** (HTTPS not required on LAN)
- ⚠️ If you need remote access, use a VPN to your home network instead of exposing the app

---

## Overview

HiAni DL WebGUI implements multiple layers of security controls to protect against injection attacks, unauthorized access, and other security threats. This document describes each security measure and its implementation.

**Security Philosophy:** Defense in depth with sensible defaults for LAN deployment.

## Security Measures

### 1. Command Injection Prevention

**Threat:** Malicious users could inject shell commands through the `extra_args` parameter to execute arbitrary code on the server.

**Mitigation:**
- **Whitelist of Allowed Arguments:** Only specific command-line arguments are permitted (`--ep-from`, `--ep-to`, `--season`, `--download-type`, `--server`, `--no-subtitles`, `--aria`, `--quality`, `--sub-lang`, `--dub-lang`, `--format`)
- **Shell Metacharacter Detection:** Blocks dangerous characters (`;`, `|`, `&`, `` ` ``, `$`, `(`, `)`, `<`, `>`, `\n`, `\r`, `\\`)
- **Safe Parsing:** Uses `shlex.split()` for proper quote handling
- **No Shell Execution:** Commands are executed with `shell=False` in subprocess
- **Argument Format Validation:** Only arguments starting with `--` are accepted

**Implementation:** `webgui/worker.py:validate_extra_args()`

**Example Attack Blocked:**
```python
# Attacker tries: extra_args = "--ep-from 1; rm -rf /"
# Result: ValueError("Invalid characters in extra_args: shell metacharacters not allowed")
```

---

### 2. SQL Injection Prevention

**Threat:** Malicious column names could be injected into database UPDATE queries to manipulate data or extract sensitive information.

**Mitigation:**
- **Column Name Whitelist:** Only valid column names from the database schema are allowed
- **Parameterized Queries:** All values use prepared statement parameters (`?`)
- **Validation Before Query:** Column names are validated against `VALID_COLUMNS` set before query construction

**Implementation:** `webgui/database.py:update_job()`

**Valid Columns:**
```python
VALID_COLUMNS = {
    'url', 'profile', 'extra_args', 'status', 'stage',
    'progress_percent', 'progress_text', 'created_at',
    'started_at', 'finished_at', 'error_message', 'log_file', 'pid'
}
```

**Example Attack Blocked:**
```python
# Attacker tries: update_job(job_id=1, **{"status; DROP TABLE jobs;--": "hacked"})
# Result: ValueError("Invalid column names: {'status; DROP TABLE jobs;--'}")
```

---

### 3. Path Traversal Prevention

**Threat:** Malicious log file paths could allow access to files outside the intended log directory (e.g., `/etc/passwd`).

**Mitigation:**
- **Path Resolution:** Converts paths to absolute paths using `Path.resolve()`
- **Directory Boundary Check:** Validates resolved path starts with the log directory path
- **File Type Validation:** Ensures the path points to a file, not a directory
- **Existence Check:** Verifies file exists before serving

**Implementation:** `webgui/app.py:validate_log_path()`

**Example Attack Blocked:**
```python
# Attacker tries: log_file = "../../../../etc/passwd"
# Result: HTTPException(400, "Log file path is outside allowed directory")
```

---

### 4. Server-Side Request Forgery (SSRF) Prevention

**Threat:** Attackers could submit URLs pointing to internal services (localhost, private networks) to scan internal infrastructure or access sensitive services.

**Mitigation:**
- **IP Address Resolution:** Resolves hostnames to IP addresses
- **Private IP Detection:** Blocks private, loopback, link-local, reserved, and multicast addresses
- **Hostname Validation:** Extracts and validates hostname before resolution

**Implementation:** `webgui/security.py:_is_private_ip()`

**Blocked IP Ranges:**
- Loopback: `127.0.0.0/8`, `::1`
- Private: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- Link-local: `169.254.0.0/16`, `fe80::/10`
- Reserved and multicast addresses

**Example Attack Blocked:**
```python
# Attacker tries: url = "http://127.0.0.1:8080/admin"
# Result: HTTPException(403, "Access to private/internal IP addresses is not allowed")
```

---

### 5. Race Condition Prevention

**Threat:** Multiple workers could start the same queued job simultaneously, wasting resources and potentially corrupting download state.

**Mitigation:**
- **Atomic Job Claiming:** Uses database transaction with conditional UPDATE
- **Status Check in Query:** Only updates jobs with status=QUEUED
- **Row Count Verification:** Checks if any rows were updated to confirm claim

**Implementation:** `webgui/database.py:claim_job()`

**SQL Query:**
```sql
UPDATE jobs
SET status = 'running', started_at = ?
WHERE id = ? AND status = 'queued'
```

---

### 6. Input Validation

**Threat:** Malformed or malicious input could bypass security controls or cause application errors.

**Mitigation:**
- **Length Limits:** URL (2048 chars), profile (100 chars), extra_args (500 chars)
- **Control Character Detection:** Blocks ASCII control characters (< 32, == 127)
- **Profile Format Validation:** Only alphanumeric, dash, and underscore allowed
- **URL Format Validation:** Checked for empty values and dangerous characters
- **Early Validation:** Input validated at API level before database storage

**Implementation:** `webgui/app.py:JobCreate` (Pydantic validators)

**Example Attack Blocked:**
```python
# Attacker tries: profile = "admin\x00root"
# Result: ValueError("Profile name can only contain alphanumeric characters, dashes, and underscores")
```

---

### 7. URL Allowlist

**Threat:** Unrestricted URL downloads could enable abuse for illegal content or bandwidth theft.

**Mitigation:**
- **Domain Allowlist:** Only domains in `URL_ALLOWLIST` environment variable are permitted
- **Subdomain Support:** Automatically allows subdomains (e.g., `hianime.to` allows `en.hianime.to`)
- **Default Deny:** If allowlist is empty, all downloads are rejected
- **Clear Error Messages:** Users receive feedback about which domains are allowed

**Implementation:** `webgui/security.py:URLValidator`

**Configuration:**
```bash
URL_ALLOWLIST="hianime.to"
```

---

### 8. Basic Authentication (Optional)

**Threat:** Unauthorized users could submit download jobs or view download history.

**Mitigation:**
- **HTTP Basic Authentication:** Standard username/password protection
- **Timing Attack Prevention:** Uses `secrets.compare_digest()` for credential comparison
- **WWW-Authenticate Header:** Properly prompts browser for credentials
- **Configurable:** Can be disabled if running on trusted networks

**Implementation:** `webgui/security.py:BasicAuthManager`

**Configuration:**
```bash
WEB_USER=admin
WEB_PASSWORD=secretpassword
```

---

### 9. Chrome Arguments Validation (CLI Mode)

**Threat:** Malicious Chrome arguments injected through `CHROME_EXTRA_ARGS` environment variable could compromise browser security or enable attacks.

**Mitigation:**
- **Whitelist of Allowed Arguments:** Only specific Chrome flags are permitted
- **Shell Metacharacter Detection:** Blocks dangerous characters (`;`, `|`, `&`, etc.)
- **Format Validation:** Arguments must start with `--`
- **Safe Parsing:** Uses `shlex.split()` for proper quote handling

**Implementation:** `extractors/hianime.py:validate_chrome_args()`

**Allowed Chrome Arguments:**
```python
ALLOWED_CHROME_ARGS = {
    '--headless', '--disable-gpu', '--no-sandbox', '--window-size',
    '--user-agent', '--disable-extensions', '--disable-notifications',
    '--user-data-dir', '--proxy-server', # ... and more
}
```

**Example Attack Blocked:**
```bash
# Attacker tries: CHROME_EXTRA_ARGS="--headless; rm -rf /"
# Result: Warning printed, dangerous characters detected, arguments ignored
```

**Example Valid Usage:**
```bash
# Valid: CHROME_EXTRA_ARGS="--headless --window-size=1920,1080"
# Result: Both arguments validated and applied to Chrome
```

---

### 10. Screen Clear Security

**Original Issue:** Used `os.system("cls")` or `os.system("clear")` which executes shell commands.

**Mitigation:**
- **ANSI Escape Codes:** Replaced with `print("\033[H\033[J", end="")`
- **No Shell Execution:** Directly writes terminal control codes
- **Cross-Platform:** Works on Windows, Linux, macOS

**Implementation:** `main.py:27`, `extractors/hianime.py:612`

**Why This Matters:**
While the original `os.system()` calls only used hardcoded commands, using ANSI codes:
- Eliminates shell invocation entirely
- Reduces attack surface
- Is faster and more portable

---

## Security Best Practices

### For Home/LAN Deployment (Recommended Use Case)

**Minimal Configuration (Trusted Home Network):**
```bash
# Just run it - core security features are always enabled
docker-compose up -d hianime-webgui

# Access at http://192.168.x.x:8080
```

**Optional Hardening for Home Use:**
```bash
# 1. Add URL filtering (optional, but recommended)
docker run -e URL_ALLOWLIST="hianime.to" ...

# 2. Add basic auth if multiple people use your network
docker run -e WEB_USER=family -e WEB_PASSWORD=simplepass ...

# 3. Resource limits (prevents one download from hogging CPU)
# Add to docker-compose.yml:
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 2G
```

**What You DON'T Need on LAN:**
- ❌ HTTPS/TLS (plain HTTP is fine on local network)
- ❌ Complex authentication (basic auth or none is sufficient)
- ❌ Strict SSRF protection (you control the network)
- ❌ Rate limiting (you trust the users)

---

### For Internet Exposure (NOT Recommended)

**If you absolutely must expose to WAN** (we strongly advise against this):

1. **HTTPS Reverse Proxy (REQUIRED):**
   ```nginx
   # nginx example
   server {
     listen 443 ssl;
     ssl_certificate /path/to/cert.pem;
     ssl_certificate_key /path/to/key.pem;

     location / {
       proxy_pass http://localhost:8080;
     }
   }
   ```

2. **Strong Authentication (REQUIRED):**
   ```bash
   docker run -e WEB_USER=admin -e WEB_PASSWORD="$(openssl rand -base64 32)" ...
   ```

3. **Firewall Rules (REQUIRED):**
   - Whitelist specific IPs only
   - Block all other traffic

4. **Rate Limiting (REQUIRED):**
   - Use nginx `limit_req` or Cloudflare
   - Prevent abuse

5. **Consider VPN Instead:**
   - Use WireGuard/Tailscale to access your home network
   - Much safer than exposing the application

### For Development

1. **Never Commit Secrets:**
   - Use `.env` files (excluded from git)
   - Don't hardcode passwords in docker-compose.yml

2. **Test Security Controls:**
   ```bash
   pytest tests/test_security.py -v
   ```

3. **Review Logs:**
   - Monitor for suspicious patterns
   - Check for failed authentication attempts

---

## Reporting Security Issues

If you discover a security vulnerability, please report it by:

1. **Email:** Create an issue on GitHub with label `security`
2. **Include:** Description, steps to reproduce, potential impact
3. **Do NOT:** Publicly disclose until fix is released

---

## Security Audit Checklist

**WebGUI Security:**
- [x] Command injection prevention (extra_args validation)
- [x] SQL injection prevention (column name whitelist)
- [x] Path traversal prevention (log file validation)
- [x] SSRF prevention (private IP blocking)
- [x] Race condition prevention (atomic job claiming)
- [x] Input validation (length limits, character filtering)
- [x] URL allowlist (domain filtering)
- [x] Authentication (optional basic auth)

**CLI Security:**
- [x] Chrome arguments validation (CHROME_EXTRA_ARGS whitelist)
- [x] Shell command elimination (replaced os.system with ANSI codes)
- [x] Filename sanitization (path traversal prevention)

**Infrastructure Security:**
- [ ] HTTPS/TLS (requires reverse proxy - not built-in)
- [ ] Rate limiting (not implemented - consider adding for WAN)
- [ ] CSRF protection (not needed for API-only endpoints)

---

## Known Limitations

1. **No Rate Limiting:** High-volume job submissions could overwhelm the system
   - **Mitigation:** Deploy behind reverse proxy with rate limiting (nginx `limit_req`)

2. **Basic Auth Over HTTP:** Credentials sent in clear text without HTTPS
   - **Mitigation:** Always use HTTPS reverse proxy in production

3. **No Session Management:** Basic auth credentials sent with every request
   - **Mitigation:** Use short-lived tokens if implementing JWT auth

4. **No Audit Logging:** Security events not logged to separate audit trail
   - **Mitigation:** Configure external log aggregation (e.g., Loki, ELK)

5. **Container Runs as Root Initially:** Entrypoint drops to app user, but starts as root
   - **Mitigation:** Required for permission fixing; alternatives being evaluated

---

## Security Testing

### Manual Testing

**Test Command Injection:**
```bash
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "extra_args": "--ep-from 1; rm -rf /"}'
# Expected: 422 Unprocessable Entity (validation error)
```

**Test Path Traversal:**
```bash
# Manually edit database to set log_file to malicious path
sqlite3 /config/jobs.db "UPDATE jobs SET log_file='../../../../etc/passwd' WHERE id=1"
curl http://localhost:8080/api/jobs/1/log
# Expected: 400 Bad Request (path validation error)
```

**Test SSRF:**
```bash
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"url": "http://127.0.0.1:8080/health"}'
# Expected: 403 Forbidden (SSRF protection)
```

### Automated Testing

```bash
# Run security test suite
pytest tests/test_security.py -v

# Test with coverage
pytest tests/test_security.py --cov=webgui --cov-report=html
```

---

## Changelog

### 2025-01-XX - Security Hardening Complete
- **WebGUI Security:**
  - Added command injection prevention for extra_args
  - Added SQL injection prevention for database updates
  - Added path traversal prevention for log downloads
  - Added SSRF protection (private IP blocking)
  - Added race condition prevention (atomic job claiming)
  - Added comprehensive input validation
- **CLI Security Improvements:**
  - Added Chrome arguments validation with whitelist (CHROME_EXTRA_ARGS)
  - Replaced os.system() calls with ANSI escape codes
  - Shell metacharacter detection for all environment inputs
- **Documentation:**
  - Comprehensive security documentation
  - LAN deployment guidance
  - Attack examples and mitigations

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE-78: OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-918: SSRF](https://cwe.mitre.org/data/definitions/918.html)
- [CWE-362: Race Condition](https://cwe.mitre.org/data/definitions/362.html)
