#!/bin/sh

set +x
source bin/formatLogMessages.sh
details "Cleaning project dependencies using npm ci..."
npm ci
success "Project dependencies cleaned and reinstalled!"
