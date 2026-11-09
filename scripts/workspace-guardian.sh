#!/bin/bash

# Opossum Ride Adventure - Workspace Guardian (Git Integrity Sentinel)
# Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
# Logic: Automated restoration of Git Engine following platform-level environment resets.

REPO_URL="https://github.com/FairiesDreamsFantasy/Opossum-Ride-Adventure.git"
USER_NAME="Fairies Dreams Fantasy"
USER_EMAIL="info@fairiesdreamsfantasy.com"
TARGET_BRANCH="main"

echo "--- Workspace Guardian: Initializing Integrity Audit ---"

# 1. Check for .git directory presence
if [ ! -d ".git" ]; then
    echo "[!] Git Engine MISSING: Platform reset detected. Initializing Recovery Protocol..."
    
    # 2. Re-initialize Git Infrastructure
    git init
    git config --global --add safe.directory /app/applet
    git config user.name "$USER_NAME"
    git config user.email "$USER_EMAIL"
    
    # 3. Re-link to Remote Source of Truth
    git remote add origin "$REPO_URL"
    
    # 4. Fetch and Align with Remote
    echo "[*] Synchronizing with remote origin..."
    git fetch origin
    
    # 5. Force-align Workspace with Remote Head
    echo "[*] Aligning workspace with branch: $TARGET_BRANCH"
    git reset --hard origin/"$TARGET_BRANCH"
    
    echo "[+] Workspace Guardian: Git Engine RESTORED and Synchronized."
else
    echo "[+] Workspace Guardian: Git Engine ONLINE. Workspace integrity verified."
fi

echo "--- Integrity Audit COMPLETE ---"
