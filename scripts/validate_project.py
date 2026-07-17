#!/usr/bin/env python3
"""Validate the Artly project structure and asset references.

Standard-library only. Run from anywhere:

    python scripts/validate_project.py

The script reports passed checks, warnings, and errors. It exits with a
non-zero status code if any critical check fails, so it can be used in a
pre-commit hook or CI step.
"""

from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

passed: list[str] = []
warnings: list[str] = []
errors: list[str] = []


def ok(msg: str) -> None:
    passed.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def err(msg: str) -> None:
    errors.append(msg)


def read_text(rel: str) -> str | None:
    path = ROOT / rel
    if not path.is_file():
        return None
    return path.read_text(encoding="utf-8", errors="replace")


# ---------------------------------------------------------------------------
# 1. Required files exist
# ---------------------------------------------------------------------------
REQUIRED_FILES = [
    "index.html",
    "styles.css",
    "app.js",
    "api/generate.js",
    "vercel.json",
    "README.md",
    ".env.example",
    ".gitignore",
    ".gitattributes",
]

for rel in REQUIRED_FILES:
    if (ROOT / rel).is_file():
        ok(f"Required file present: {rel}")
    else:
        err(f"Missing required file: {rel}")


# ---------------------------------------------------------------------------
# 2. Local asset references in index.html resolve to real files
# ---------------------------------------------------------------------------
def is_local_ref(ref: str) -> bool:
    ref = ref.strip()
    if not ref:
        return False
    lowered = ref.lower()
    if lowered.startswith(("http://", "https://", "data:", "//", "mailto:", "#")):
        return False
    return True


html = read_text("index.html")
if html is not None:
    refs = re.findall(r'(?:src|href)\s*=\s*"([^"]+)"', html)
    local_refs = [r for r in refs if is_local_ref(r)]
    for ref in sorted(set(local_refs)):
        target = (ROOT / ref).resolve()
        if target.is_file():
            ok(f"index.html reference resolves: {ref}")
        else:
            err(f"index.html references missing file: {ref}")
    if not local_refs:
        warn("index.html has no local asset references (unexpected).")


# ---------------------------------------------------------------------------
# 3. Style-preview image references in app.js resolve to real files
# ---------------------------------------------------------------------------
app_js = read_text("app.js")
if app_js is not None:
    img_refs = re.findall(r"img\s*:\s*'([^']+)'", app_js)
    local_img_refs = [r for r in img_refs if is_local_ref(r)]
    for ref in sorted(set(local_img_refs)):
        if (ROOT / ref).is_file():
            ok(f"app.js style image resolves: {ref}")
        else:
            err(f"app.js references missing image: {ref}")
    if not local_img_refs:
        warn("app.js has no local style-image references (unexpected).")


# ---------------------------------------------------------------------------
# 4. Common asset folders exist and are not empty
# ---------------------------------------------------------------------------
for folder in ["images", "images/styles", "audio"]:
    path = ROOT / folder
    if not path.is_dir():
        err(f"Missing asset folder: {folder}/")
    elif not any(path.iterdir()):
        warn(f"Asset folder is empty: {folder}/")
    else:
        ok(f"Asset folder present and populated: {folder}/")


# ---------------------------------------------------------------------------
# 5. No .env or secret files are tracked by git
# ---------------------------------------------------------------------------
SECRET_NAME_PATTERNS = [
    re.compile(r"(^|/)\.env$"),
    re.compile(r"(^|/)\.env\.(?!example$)[^/]+$"),
    re.compile(r"\.pem$"),
    re.compile(r"(^|/)id_rsa$"),
    re.compile(r"(^|/)credentials\.json$"),
    re.compile(r"(^|/)secrets?\.(json|ya?ml|txt)$"),
]

try:
    tracked = subprocess.run(
        ["git", "ls-files"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=True,
    ).stdout.splitlines()
    flagged = [
        f for f in tracked
        if any(p.search(f) for p in SECRET_NAME_PATTERNS)
    ]
    if flagged:
        for f in flagged:
            err(f"Secret-like file is tracked by git: {f}")
    else:
        ok("No .env or secret-like files are tracked by git.")
except (subprocess.CalledProcessError, FileNotFoundError):
    warn("Could not run 'git ls-files' (git unavailable or not a repo); "
         "skipped tracked-secret check.")


# ---------------------------------------------------------------------------
# 6. .env.example contains placeholders only (no real secret values)
# ---------------------------------------------------------------------------
PLACEHOLDER_TOKENS = (
    "your", "placeholder", "example", "here", "changeme",
    "xxx", "<", ">", "todo", "replace",
)


def looks_like_placeholder(value: str) -> bool:
    v = value.strip().strip('"').strip("'")
    if v == "":
        return True
    low = v.lower()
    if any(tok in low for tok in PLACEHOLDER_TOKENS):
        return True
    return False


env_example = read_text(".env.example")
if env_example is not None:
    saw_gemini = False
    for raw in env_example.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            warn(f".env.example line is not KEY=VALUE: {line!r}")
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        if key == "GEMINI_API_KEY":
            saw_gemini = True
        if looks_like_placeholder(value):
            ok(f".env.example uses a placeholder for {key}.")
        else:
            err(f".env.example may contain a real secret value for {key}.")
        # Extra guard: obvious Google API key shape.
        if re.search(r"AIza[0-9A-Za-z_\-]{20,}", value):
            err(f".env.example contains a Google-style API key for {key}.")
    if saw_gemini:
        ok(".env.example documents GEMINI_API_KEY.")
    else:
        warn(".env.example does not document GEMINI_API_KEY "
             "(the API reads process.env.GEMINI_API_KEY).")


# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
def section(title: str, items: list[str]) -> None:
    print(f"\n{title} ({len(items)})")
    for item in items:
        print(f"  - {item}")


print("=" * 60)
print("Artly project validation")
print("=" * 60)

if passed:
    section("PASSED", passed)
if warnings:
    section("WARNINGS", warnings)
if errors:
    section("ERRORS", errors)

print("\n" + "-" * 60)
print(f"Summary: {len(passed)} passed, {len(warnings)} warning(s), "
      f"{len(errors)} error(s)")

if errors:
    print("Result: FAILED")
    sys.exit(1)

print("Result: OK")
sys.exit(0)
