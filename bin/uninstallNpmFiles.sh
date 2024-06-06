#!/bin/sh

set +x
source bin/formatLogMessages.sh
details "Uninstalling project dependencies..."
npx rimraf rm -rf node_modules
npx rimraf rm -rf package-lock.json
npx rimraf rm -rf .npm
npx rimraf rm -rf .cache
success "Third-party packages and libraries removed!"
