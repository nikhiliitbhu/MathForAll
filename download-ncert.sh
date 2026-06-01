#!/bin/bash
# Run this once to download all NCERT PDFs into your project's public folder
# Usage: bash download-ncert.sh /path/to/your/mathrix/project

PROJECT_DIR="${1:-.}"
OUT_DIR="$PROJECT_DIR/public/books"
mkdir -p "$OUT_DIR"

BASE="https://ncert.nic.in/textbook/pdf"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

declare -A BOOKS=(
  # Class 6
  ["class6-en"]="fegp1ps.pdf"
  ["class6-hi"]="fhgp1ps.pdf"
  # Class 7
  ["class7-en"]="gegp1ps.pdf"
  ["class7-hi"]="ghgp1ps.pdf"
  # Class 8
  ["class8-en"]="hegp1ps.pdf"
  ["class8-hi"]="hhgp1ps.pdf"
  # Class 9
  ["class9-en"]="iemh1ps.pdf"
  ["class9-hi"]="ihmh1ps.pdf"
  # Class 10
  ["class10-en"]="jemh1ps.pdf"
  ["class10-hi"]="jhmh1ps.pdf"
  # Class 11
  ["class11-en"]="kemh1ps.pdf"
  ["class11-hi"]="kham1ps.pdf"
  # Class 12
  ["class12-en"]="lemh1ps.pdf"
  ["class12-hi"]="lhmh1ps.pdf"
)

echo "📚 Downloading NCERT PDFs to: $OUT_DIR"
echo ""

for NAME in "${!BOOKS[@]}"; do
  FILE="${BOOKS[$NAME]}"
  URL="$BASE/$FILE"
  OUT="$OUT_DIR/$FILE"

  if [ -f "$OUT" ]; then
    echo "✅ Already exists: $FILE"
    continue
  fi

  echo "⬇️  Downloading $NAME → $FILE"
  curl -L -A "$UA" \
    -H "Referer: https://ncert.nic.in/textbook.php" \
    -H "Accept: application/pdf,*/*" \
    --retry 3 --retry-delay 2 \
    -o "$OUT" \
    "$URL"

  if [ $? -eq 0 ] && [ -s "$OUT" ]; then
    SIZE=$(du -sh "$OUT" | cut -f1)
    echo "   ✅ Saved ($SIZE)"
  else
    echo "   ❌ Failed — delete partial file"
    rm -f "$OUT"
  fi
  sleep 1  # be polite to NCERT server
done

echo ""
echo "🎉 Done! Put these in: public/books/"