#!/bin/sh

set +x
source bin/formatLogMessages.sh
details "Checking for outdated packages..."
npx npm-check-updates
details "Upgrading project dependencies..."
npx npm-check-updates -u
npm update --latest
success "Up to date! Checking updates..."
npm outdated
