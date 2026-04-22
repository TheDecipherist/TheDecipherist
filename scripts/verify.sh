#!/bin/bash
# MDD verification skeleton for 01-create-github-pages
# Checks that all expected output files exist and the CSS build works.
# Run from repo root: ./scripts/verify.sh
# All checks must pass (exit 0) before the feature is declared complete.

set -e
PASS=0; FAIL=0

check() {
  local label="$1"; local file="$2"
  if [ -f "$file" ] || [ -d "$file" ]; then
    echo "  ✓ $label"
    PASS=$((PASS+1))
  else
    echo "  ✗ MISSING: $label ($file)"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "=== HTML Pages ==="
check "index.html"           "docs/index.html"
check "cipher/index.html"    "docs/cipher/index.html"
check "articles/index.html"  "docs/articles/index.html"
check "projects/index.html"  "docs/projects/index.html"
check "resume/index.html"    "docs/resume/index.html"

echo ""
echo "=== CSS Source Files ==="
check "reset.css"         "docs/css/src/base/reset.css"
check "tokens.css"        "docs/css/src/base/tokens.css"
check "typography.css"    "docs/css/src/base/typography.css"
check "accessibility.css" "docs/css/src/base/accessibility.css"
check "grid.css"          "docs/css/src/layout/grid.css"
check "sections.css"      "docs/css/src/layout/sections.css"
check "nav.css"           "docs/css/src/components/nav.css"
check "hero.css"          "docs/css/src/components/hero.css"
check "stat-counter.css"  "docs/css/src/components/stat-counter.css"
check "article-card.css"  "docs/css/src/components/article-card.css"
check "project-card.css"  "docs/css/src/components/project-card.css"
check "wave-dividers.css" "docs/css/src/components/wave-dividers.css"
check "cipher-timeline.css" "docs/css/src/components/cipher-timeline.css"
check "footer.css"        "docs/css/src/components/footer.css"
check "scroll-driven.css" "docs/css/src/animations/scroll-driven.css"
check "keyframes.css"     "docs/css/src/animations/keyframes.css"

echo ""
echo "=== CSS Build ==="
check "main.css (built)"  "docs/css/main.css"

echo ""
echo "=== JavaScript ==="
check "main.js"               "docs/js/main.js"
check "hero-particles.js"     "docs/js/hero-particles.js"
check "cipher-grid.worklet.js" "docs/js/cipher-grid.worklet.js"
check "prefetch.js"           "docs/js/prefetch.js"

echo ""
echo "=== Assets ==="
check "favicon.svg"       "docs/favicon.svg"
check "site.webmanifest"  "docs/site.webmanifest"
check "CNAME"             "docs/CNAME"

echo ""
echo "=== Directories ==="
check "docs/fonts/"   "docs/fonts"
check "docs/icons/"   "docs/icons"
check "docs/images/"  "docs/images"

echo ""
echo "=== Build Scripts ==="
check "build-css.sh"      "scripts/build-css.sh"
check "convert-images.sh" "scripts/convert-images.sh"

echo ""
echo "=== Content Checks ==="
# Verify no hex colors in CSS source
HEX_COUNT=$(grep -r '#[0-9a-fA-F]\{3,6\}' docs/css/src/ --include="*.css" 2>/dev/null | grep -v "^.*//.*#" | wc -l)
if [ "$HEX_COUNT" -eq 0 ]; then
  echo "  ✓ No hex colors in CSS source"
  PASS=$((PASS+1))
else
  echo "  ✗ FAIL: $HEX_COUNT hex color(s) found in CSS source"
  FAIL=$((FAIL+1))
fi

# Verify index.html has skip link
if grep -q 'class="skip-link"' docs/index.html 2>/dev/null; then
  echo "  ✓ Skip link present in index.html"
  PASS=$((PASS+1))
else
  echo "  ✗ MISSING: skip-link in index.html"
  FAIL=$((FAIL+1))
fi

# Verify CNAME contains correct domain
if grep -q 'thedecipherist.com' docs/CNAME 2>/dev/null; then
  echo "  ✓ CNAME contains thedecipherist.com"
  PASS=$((PASS+1))
else
  echo "  ✗ FAIL: CNAME missing or incorrect"
  FAIL=$((FAIL+1))
fi

echo ""
echo "=================================="
echo "Results: $PASS passed, $FAIL failed"
echo "=================================="
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
exit 0
