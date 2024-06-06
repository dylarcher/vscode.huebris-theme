#!/bin/sh

set +x
source bin/formatLogMessages.sh
source bin/updateProjectDependencies.sh
details "Cleaning project dependencies..."
npm clean-install --ddp --engine-strict --save-exact
success "Completed!"
