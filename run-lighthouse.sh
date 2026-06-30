#!/usr/bin/env bash
set -e

PORT=3456
URL="http://localhost:$PORT"
DIR="$(cd "$(dirname "$0")" && pwd)"

echo "▸ Starting local server on port $PORT..."
npx serve "$DIR/out" -p $PORT --no-clipboard > /tmp/lh-serve.log 2>&1 &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

for i in {1..15}; do
  curl -sf "$URL" > /dev/null 2>&1 && break
  sleep 1
done

LH="npx lighthouse@13 $URL --output=html --quiet --chrome-flags='--headless --no-sandbox'"

run_lh() {
  local name="$1"; shift
  echo "▸ Running: $name"
  eval "$LH $@ --output-path='$DIR/$name.html'"
  echo "  ✓ $name.html"
}

# ── iPhone ────────────────────────────────────────────────────────────────────
# iPhone 12 mini / 13 mini  →  375×812 @3x
run_lh "lh-iphone-12mini" \
  "--screenEmulation.mobile=true --screenEmulation.width=375 --screenEmulation.height=812 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 12 / 12 Pro / 13 / 13 Pro / 14  →  390×844 @3x
run_lh "lh-iphone-12" \
  "--screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 12 Pro Max / 13 Pro Max / 14 Plus  →  428×926 @3x
run_lh "lh-iphone-12promax" \
  "--screenEmulation.mobile=true --screenEmulation.width=428 --screenEmulation.height=926 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 14 Pro / 15 / 15 Pro / 16  →  393×852 @3x
run_lh "lh-iphone-14pro" \
  "--screenEmulation.mobile=true --screenEmulation.width=393 --screenEmulation.height=852 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus  →  430×932 @3x
run_lh "lh-iphone-14promax" \
  "--screenEmulation.mobile=true --screenEmulation.width=430 --screenEmulation.height=932 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 16 Pro  →  402×874 @3x
run_lh "lh-iphone-16pro" \
  "--screenEmulation.mobile=true --screenEmulation.width=402 --screenEmulation.height=874 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 16 Pro Max / 17 Pro Max  →  440×956 @3x
run_lh "lh-iphone-16promax" \
  "--screenEmulation.mobile=true --screenEmulation.width=440 --screenEmulation.height=956 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# iPhone 17 / 17 Air  →  393×852 @3x (same as 15/16 base)
run_lh "lh-iphone-17" \
  "--screenEmulation.mobile=true --screenEmulation.width=393 --screenEmulation.height=852 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# ── Android ───────────────────────────────────────────────────────────────────
# Budget / small  →  360×800 @2x
run_lh "lh-android-small" \
  "--screenEmulation.mobile=true --screenEmulation.width=360 --screenEmulation.height=800 --screenEmulation.deviceScaleFactor=2 --throttling-method=simulate"

# Samsung Galaxy S24 / A-series mid-range  →  384×832 @2.625x
run_lh "lh-android-galaxys24" \
  "--screenEmulation.mobile=true --screenEmulation.width=384 --screenEmulation.height=832 --screenEmulation.deviceScaleFactor=2.625 --throttling-method=simulate"

# Google Pixel 7 / 8  →  393×851 @2.75x
run_lh "lh-android-pixel8" \
  "--screenEmulation.mobile=true --screenEmulation.width=393 --screenEmulation.height=851 --screenEmulation.deviceScaleFactor=2.75 --throttling-method=simulate"

# Google Pixel 9 Pro / Samsung Galaxy S24+ →  411×914 @3.5x
run_lh "lh-android-pixel9pro" \
  "--screenEmulation.mobile=true --screenEmulation.width=411 --screenEmulation.height=914 --screenEmulation.deviceScaleFactor=3.5 --throttling-method=simulate"

# Samsung Galaxy S24 Ultra / large flagships  →  412×915 @3.5x
run_lh "lh-android-galaxys24ultra" \
  "--screenEmulation.mobile=true --screenEmulation.width=412 --screenEmulation.height=915 --screenEmulation.deviceScaleFactor=3.5 --throttling-method=simulate"

# Large Android / OnePlus / Xiaomi  →  430×932 @3x
run_lh "lh-android-large" \
  "--screenEmulation.mobile=true --screenEmulation.width=430 --screenEmulation.height=932 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate"

# ── iPad ──────────────────────────────────────────────────────────────────────
# iPad mini 6  →  744×1133 @2x
run_lh "lh-ipad-mini" \
  "--form-factor=desktop --screenEmulation.mobile=false --screenEmulation.width=744 --screenEmulation.height=1133 --screenEmulation.deviceScaleFactor=2 --throttling-method=simulate"

# iPad Air / iPad 10th gen  →  820×1180 @2x
run_lh "lh-ipad-air" \
  "--form-factor=desktop --screenEmulation.mobile=false --screenEmulation.width=820 --screenEmulation.height=1180 --screenEmulation.deviceScaleFactor=2 --throttling-method=simulate"

# iPad Pro 11"  →  834×1194 @2x
run_lh "lh-ipad-pro11" \
  "--form-factor=desktop --screenEmulation.mobile=false --screenEmulation.width=834 --screenEmulation.height=1194 --screenEmulation.deviceScaleFactor=2 --throttling-method=simulate"

# iPad Pro 13"  →  1024×1366 @2x
run_lh "lh-ipad-pro13" \
  "--form-factor=desktop --screenEmulation.mobile=false --screenEmulation.width=1024 --screenEmulation.height=1366 --screenEmulation.deviceScaleFactor=2 --throttling-method=simulate"

# ── MacBook ───────────────────────────────────────────────────────────────────
# MacBook Air 13"  →  1280×800 @2x
run_lh "lh-mac-air13" \
  "--preset=desktop --screenEmulation.width=1280 --screenEmulation.height=800 --screenEmulation.deviceScaleFactor=2"

# MacBook Air 15"  →  1470×956 @2x
run_lh "lh-mac-air15" \
  "--preset=desktop --screenEmulation.width=1470 --screenEmulation.height=956 --screenEmulation.deviceScaleFactor=2"

# MacBook Pro 14"  →  1512×982 @2x
run_lh "lh-mac-pro14" \
  "--preset=desktop --screenEmulation.width=1512 --screenEmulation.height=982 --screenEmulation.deviceScaleFactor=2"

# MacBook Pro 16"  →  1728×1117 @2x
run_lh "lh-mac-pro16" \
  "--preset=desktop --screenEmulation.width=1728 --screenEmulation.height=1117 --screenEmulation.deviceScaleFactor=2"

# ── Windows ───────────────────────────────────────────────────────────────────
# HD laptop (budget)  →  1366×768 @1x
run_lh "lh-win-hd" \
  "--preset=desktop --screenEmulation.width=1366 --screenEmulation.height=768 --screenEmulation.deviceScaleFactor=1"

# FHD (most common)  →  1920×1080 @1x
run_lh "lh-win-fhd" \
  "--preset=desktop --screenEmulation.width=1920 --screenEmulation.height=1080 --screenEmulation.deviceScaleFactor=1"

# FHD with 125% scaling  →  1536×864 @1.25x
run_lh "lh-win-fhd-125" \
  "--preset=desktop --screenEmulation.width=1536 --screenEmulation.height=864 --screenEmulation.deviceScaleFactor=1.25"

# QHD  →  2560×1440 @1.5x
run_lh "lh-win-qhd" \
  "--preset=desktop --screenEmulation.width=2560 --screenEmulation.height=1440 --screenEmulation.deviceScaleFactor=1.5"

# 4K UHD  →  3840×2160 @2x (at 200% scaling)
run_lh "lh-win-4k" \
  "--preset=desktop --screenEmulation.width=1920 --screenEmulation.height=1080 --screenEmulation.deviceScaleFactor=2"

# Surface Pro / Windows tablet  →  1368×912 @2x
run_lh "lh-win-surface" \
  "--preset=desktop --screenEmulation.width=1368 --screenEmulation.height=912 --screenEmulation.deviceScaleFactor=2"

echo ""
echo "Done. $(ls $DIR/lh-*.html | wc -l | tr -d ' ') reports saved to project root."
