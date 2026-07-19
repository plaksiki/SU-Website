#!/bin/bash

BASE_URL="${BASE_URL:-http://localhost}"

echo "==================================="
echo "🔍 Health Check: SU Website"
echo "BASE_URL: $BASE_URL"
echo "==================================="

FAILED=0

check_url() {
  local url="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$code" = "200" ]; then
    echo "✅ $url — HTTP $code"
  else
    echo "❌ $url — HTTP $code (expected 200)"
    FAILED=1
  fi
}

check_url "$BASE_URL/"
check_url "$BASE_URL/events"
check_url "$BASE_URL/polls"

echo "==================================="
if [ "$FAILED" -eq 1 ]; then
  echo "❌ Health Check FAILED"
  exit 1
fi
echo "✅ Health Check Complete"
echo "==================================="
