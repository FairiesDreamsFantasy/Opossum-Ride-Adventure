#!/usr/bin/env bash
set -e

echo "=== Opossum Ride Adventure: Stable Deployment Gate (v0.1.0.7.4) ==="

if [ ! -f "VERSION.txt" ]; then
  echo "[-] Error: VERSION.txt not found!"
  exit 1
fi

VERSION=$(cat VERSION.txt | tr -d '[:space:]')
echo "[+] Detected version: $VERSION"

if [ "$VERSION" != "0.1.0.7.4" ]; then
  echo "[-] Error: Version mismatch! Expected 0.1.0.7.4, got $VERSION"
  exit 1
fi

echo "[+] Running production build test..."
npm run build

echo "[+] All checks passed successfully! Stable deployment to main branch approved."
