#!/bin/sh

set +x
version=${1:---latest}
source ~/.nvm/nvm.sh
source bin/formatLogMessages.sh
details "Setting up project prerequisites..."
nvm install $version
nvm install-latest-npm
nvm use $version --latest-npm
success "All set!"
