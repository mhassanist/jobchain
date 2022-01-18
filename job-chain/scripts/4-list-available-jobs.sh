#!/usr/bin/env bash
# exit on first error after this point to avoid redeploying with successful build
set -e

echo "Listing available jobs"
echo
near call  "$CONTRACT" getAvailableJobs '{}'  --account-id="$OWNER"