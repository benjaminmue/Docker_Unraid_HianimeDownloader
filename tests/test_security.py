"""
Tests for URL validation and security.
"""

import pytest
from fastapi import HTTPException

from webgui.security import URLValidator


def test_url_validator_no_allowlist():
    """Test validator with no allowlist (allow all)."""
    validator = URLValidator(allowlist=None)

    # Should allow any valid URL
    assert validator.validate("https://example.com/video")
    assert validator.validate("http://test.com/path")


def test_url_validator_empty_allowlist():
    """Test validator with empty allowlist (reject all)."""
    validator = URLValidator(allowlist=[])

    # Should reject all URLs
    with pytest.raises(HTTPException) as exc_info:
        validator.validate("https://example.com/video")

    assert exc_info.value.status_code == 403
    assert "disabled" in exc_info.value.detail.lower()


def test_url_validator_with_allowlist():
    """Test validator with specific allowlist."""
    validator = URLValidator(allowlist=["example.com", "test.org"])

    # Should allow whitelisted domains
    assert validator.validate("https://example.com/video")
    assert validator.validate("https://www.example.com/video")  # subdomain
    assert validator.validate("http://test.org/path")

    # Should reject non-whitelisted domains
    with pytest.raises(HTTPException) as exc_info:
        validator.validate("https://blocked.com/video")

    assert exc_info.value.status_code == 403
    assert "not in the allowlist" in exc_info.value.detail


def test_url_validator_invalid_scheme():
    """Test validator rejects invalid schemes."""
    validator = URLValidator(allowlist=None)

    # Should reject ftp, file, etc.
    with pytest.raises(HTTPException) as exc_info:
        validator.validate("ftp://example.com/file")

    assert exc_info.value.status_code == 400
    assert "scheme" in exc_info.value.detail.lower()


def test_url_validator_invalid_format():
    """Test validator rejects invalid URL formats."""
    validator = URLValidator(allowlist=None)

    # Should reject malformed URLs
    with pytest.raises(HTTPException):
        validator.validate("not a url")

    with pytest.raises(HTTPException):
        validator.validate("://missing-scheme.com")


def test_url_validator_missing_domain():
    """Test validator rejects URLs without domain."""
    validator = URLValidator(allowlist=None)

    with pytest.raises(HTTPException) as exc_info:
        validator.validate("https://")

    assert exc_info.value.status_code == 400
    assert "domain" in exc_info.value.detail.lower()
