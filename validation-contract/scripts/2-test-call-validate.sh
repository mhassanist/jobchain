#!/usr/bin/env bash
# exit on first error after this point to avoid redeploying with successful build
set -e

echo "calling the contract with invalid work sample 'test' "
echo
near call "$CONTRACT" validate '{"jobTitle":"title","work":"test", "submitter":"msaudi.testnet"}' --accountId="$OWNER"

echo "calling the contract with valid work sample 'test@gmail.com' "
echo
near call "$CONTRACT" validate '{"jobTitle":"title","work":"test@gmail.com", "submitter":"msaudi.testnet"}' --accountId="$OWNER"