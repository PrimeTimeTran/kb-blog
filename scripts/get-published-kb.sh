#!/usr/bin/env bash
set -euo pipefail

SRC="/Users/future/KB"
DEST="/Users/future/KB/project/app/blog/data/kb"

echo "🔄 Building KB from: $SRC"
echo "📦 Output: $DEST"

rm -rf "$DEST"
mkdir -p "$DEST"

echo "🔎 Scanning markdown files..."

find "$SRC" \
  -type d \( \
    -path "*/node_modules" -o \
    -path "*/.git" -o \
    -path "*/.obsidian" -o \
    -path "*/.venv" -o \
    -path "*/venv" -o \
    -path "*/target" -o \
    -path "*/.next" -o \
    -path "*/project" \
    -path "*/generated" \
    -path "*/term" \
  \) -prune -o \
  -type f -name "*.md" -print |
while read -r file; do

  # Extract frontmatter safely
  if awk 'BEGIN {in_yaml=0; draft=1}
    /^---$/ {in_yaml++; next}
    in_yaml==1 && /^draft:[[:space:]]*false/ {draft=0}
    in_yaml==2 {exit}
    END {exit draft}' "$file"; then

    # compute relative path
    rel="${file#$SRC/}"
    out="$DEST/$rel"

    mkdir -p "$(dirname "$out")"
    cp "$file" "$out"

    echo "✔ included: $rel"

  else
    echo "✖ skipped (draft or no FM): ${file#$SRC/}"
  fi

done

echo "✅ KB build complete"
