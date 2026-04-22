#!/bin/bash
# Convert source images to AVIF + WebP + responsive sizes
# Requires: npx @squoosh/cli
# Run from repo root once when new images are added to docs/images/src/

set -e

WIDTHS=(400 800 1200 1600)
SRC_DIR="docs/images/src"
OUT_DIR="docs/images"

if [ ! -d "$SRC_DIR" ]; then
  echo "Source directory $SRC_DIR does not exist."
  exit 1
fi

IMAGES=$(find "$SRC_DIR" -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" 2>/dev/null)

if [ -z "$IMAGES" ]; then
  echo "No source images found in $SRC_DIR"
  exit 0
fi

for file in $IMAGES; do
  name=$(basename "$file" | sed 's/\.[^.]*$//')
  echo "Processing: $name"

  for w in "${WIDTHS[@]}"; do
    npx @squoosh/cli --avif '{"cqLevel":28}' --resize "{\"width\":$w}" \
      -d "$OUT_DIR" "$file" -s "-${w}"
    npx @squoosh/cli --webp '{"quality":82}' --resize "{\"width\":$w}" \
      -d "$OUT_DIR" "$file" -s "-${w}"
    npx @squoosh/cli --mozjpeg '{"quality":85}' --resize "{\"width\":$w}" \
      -d "$OUT_DIR" "$file" -s "-${w}"
  done
done

echo "Image conversion complete."
