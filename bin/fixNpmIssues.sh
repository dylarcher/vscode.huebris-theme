#!/bin/sh

set +x
source bin/formatLogMessages.sh
details "Repaired project node issues..."
npm doctor
npm audit fix
success "All fixed!"
