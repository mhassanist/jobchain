#!/usr/bin/env bash
# exit on first error after this point to avoid redeploying with successful build
set -e

echo "Listing all jobs"
echo
near call  "$CONTRACT" getAllJobs '{}'  --account-id="$OWNER"