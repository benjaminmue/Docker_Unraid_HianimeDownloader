# Security Documentation

This document outlines the security measures implemented in GDownloader WebGUI to protect against common web application vulnerabilities.

## Overview

GDownloader WebGUI implements multiple layers of security controls to protect against injection attacks, unauthorized access, and other security threats. This document describes each security measure and its implementation.

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
URL_ALLOWLIST="hianime.to,youtube.com,instagram.com"
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

## Security Best Practices

### For Deployment

1. **Enable Basic Authentication:**
   ```bash
   docker run -e WEB_USER=admin -e WEB_PASSWORD=strongpassword ...
   ```

2. **Configure URL Allowlist:**
   ```bash
   docker run -e URL_ALLOWLIST="hianime.to,youtube.com" ...
   ```

3. **Use HTTPS Reverse Proxy:**
   - Put GDownloader behind nginx/Traefik with TLS
   - This encrypts credentials and prevents MITM attacks

4. **Network Isolation:**
   - Run container on isolated Docker network
   - Don't expose port 8080 to public internet directly

5. **Regular Updates:**
   - Keep Docker image and dependencies updated
   - Monitor security advisories

6. **Resource Limits:**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 2G
   ```

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

- [x] Command injection prevention (extra_args validation)
- [x] SQL injection prevention (column name whitelist)
- [x] Path traversal prevention (log file validation)
- [x] SSRF prevention (private IP blocking)
- [x] Race condition prevention (atomic job claiming)
- [x] Input validation (length limits, character filtering)
- [x] URL allowlist (domain filtering)
- [x] Authentication (optional basic auth)
- [ ] HTTPS/TLS (requires reverse proxy - not built-in)
- [ ] Rate limiting (not implemented - consider adding)
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

### 2025-01-XX - Initial Security Hardening
- Added command injection prevention
- Added SQL injection prevention
- Added path traversal prevention
- Added SSRF protection
- Added race condition prevention
- Added comprehensive input validation
- Documented all security measures

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE-78: OS Command Injection](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-89: SQL Injection](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-22: Path Traversal](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-918: SSRF](https://cwe.mitre.org/data/definitions/918.html)
- [CWE-362: Race Condition](https://cwe.mitre.org/data/definitions/362.html)
