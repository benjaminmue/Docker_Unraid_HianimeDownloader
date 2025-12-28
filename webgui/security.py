"""
Security utilities for URL validation and authentication.
"""

import secrets
import socket
import ipaddress
from typing import Optional, List
from urllib.parse import urlparse
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials


class URLValidator:
    def __init__(self, allowlist: Optional[List[str]] = None):
        """
        Initialize URL validator with optional domain allowlist.

        Args:
            allowlist: List of allowed domains. Empty list = reject all URLs.
                      None = no allowlist (allow all).
        """
        self.allowlist = allowlist
        self.use_allowlist = allowlist is not None

    def _is_private_ip(self, hostname: str) -> bool:
        """Check if hostname resolves to a private/internal IP address (SSRF protection)."""
        try:
            # Try to parse as IP address directly
            try:
                ip = ipaddress.ip_address(hostname)
            except ValueError:
                # Not a direct IP, try to resolve hostname
                try:
                    resolved_ip = socket.gethostbyname(hostname)
                    ip = ipaddress.ip_address(resolved_ip)
                except (socket.gaierror, socket.timeout):
                    # DNS resolution failed - allow it to proceed
                    # The actual download will fail naturally if domain is invalid
                    return False

            # Check if IP is private, loopback, link-local, or reserved
            return (
                ip.is_private
                or ip.is_loopback
                or ip.is_link_local
                or ip.is_reserved
                or ip.is_multicast
            )

        except Exception:
            # On any error, be conservative and allow (will fail later naturally)
            return False

    def validate(self, url: str) -> bool:
        """
        Validate URL against security rules.

        Returns:
            True if URL is valid and allowed.

        Raises:
            HTTPException: If URL is invalid or not allowed.
        """
        # Parse URL
        try:
            parsed = urlparse(url)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid URL format: {e}",
            )

        # Check scheme
        if parsed.scheme not in ("http", "https"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid URL scheme: {parsed.scheme}. Only http and https are allowed.",
            )

        # Extract domain (may include port)
        domain = parsed.netloc.lower()
        if not domain:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="URL must have a domain",
            )

        # Extract hostname without port for IP validation
        hostname = parsed.hostname
        if not hostname:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="URL must have a valid hostname",
            )

        # SSRF Protection: Block private/internal IP addresses
        if self._is_private_ip(hostname):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access to private/internal IP addresses is not allowed (SSRF protection)",
            )

        # Check allowlist if configured
        if self.use_allowlist:
            if not self.allowlist:
                # Empty allowlist means reject all
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="URL downloads are disabled. Configure URL_ALLOWLIST to enable.",
                )

            # Check if domain matches any allowed domain
            allowed = False
            for allowed_domain in self.allowlist:
                allowed_domain = allowed_domain.lower().strip()

                # Exact match or subdomain match
                if domain == allowed_domain or domain.endswith(f".{allowed_domain}"):
                    allowed = True
                    break

            if not allowed:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Domain '{domain}' is not in the allowlist. Allowed domains: {', '.join(self.allowlist)}",
                )

        return True


class BasicAuthManager:
    def __init__(self, username: Optional[str] = None, password: Optional[str] = None):
        """
        Initialize basic auth manager.

        Args:
            username: Required username. If None, auth is disabled.
            password: Required password.
        """
        self.enabled = username is not None and password is not None
        self.username = username
        self.password = password
        self.security = HTTPBasic() if self.enabled else None

    def verify(self, credentials: HTTPBasicCredentials = Depends(HTTPBasic())) -> str:
        """
        Verify basic auth credentials.

        Returns:
            Username if valid.

        Raises:
            HTTPException: If credentials are invalid.
        """
        if not self.enabled:
            return "anonymous"

        # Use secrets.compare_digest to prevent timing attacks
        username_correct = secrets.compare_digest(
            credentials.username.encode("utf-8"),
            self.username.encode("utf-8"),
        )
        password_correct = secrets.compare_digest(
            credentials.password.encode("utf-8"),
            self.password.encode("utf-8"),
        )

        if not (username_correct and password_correct):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Basic"},
            )

        return credentials.username

    def get_dependency(self):
        """Get FastAPI dependency for auth."""
        if self.enabled:
            return Depends(self.verify)
        return None
