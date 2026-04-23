#!/bin/bash
# Build CSS: concatenate source files into single docs/css/main.css
# Run from repo root: ./scripts/build-css.sh

set -e

OUT="docs/css/main.css"

# Write @layer order declaration first
echo "@layer reset, tokens, base, layout, components, animations, utilities;" > "$OUT"
echo "" >> "$OUT"

cat \
  docs/css/src/base/reset.css \
  docs/css/src/base/tokens.css \
  docs/css/src/base/typography.css \
  docs/css/src/base/accessibility.css \
  docs/css/src/layout/grid.css \
  docs/css/src/layout/sections.css \
  docs/css/src/components/hero.css \
  docs/css/src/components/stat-counter.css \
  docs/css/src/components/article-card.css \
  docs/css/src/components/project-card.css \
  docs/css/src/components/repo-card.css \
  docs/css/src/components/wave-dividers.css \
  docs/css/src/components/cipher-timeline.css \
  docs/css/src/components/footer.css \
  docs/css/src/animations/scroll-driven.css \
  docs/css/src/animations/keyframes.css \
  >> "$OUT"

BYTES=$(wc -c < "$OUT")
echo "main.css built: ${BYTES} bytes ($(echo "scale=1; $BYTES/1024" | bc)KB)"
echo "Target: under 40KB uncompressed"
