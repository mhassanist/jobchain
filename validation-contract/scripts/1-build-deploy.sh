#!/usr/bin/env bash
# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn asb --target release

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near deploy --accountId="$CONTRACT" --wasmFile="./build/release/app-one.wasm"
