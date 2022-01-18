#!/usr/bin/env bash
# exit on first error after this point to avoid redeploying with successful build
set -e

echo "Creating a job"
echo
near call  "$CONTRACT" createJob '{"title":"title1","jobDescription":"job1","offeredAmount":"1","validationContract":"validate.msaudi2.testnet","validationMethod":"validate"}'  --account-id="$OWNER" --amount=1