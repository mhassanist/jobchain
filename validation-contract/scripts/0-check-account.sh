#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable"
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable"

echo "deleting $CONTRACT and setting $OWNER as beneficiary"
echo
near delete $CONTRACT $OWNER

echo "Creating new account"
echo
near create-account "$CONTRACT" --masterAccount "$OWNER"

# exit on first error after this point to avoid redeploying with successful build
set -e