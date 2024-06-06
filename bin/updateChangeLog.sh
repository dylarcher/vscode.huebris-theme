#!/bin/sh

set +x

PACKAGE="require('./package.json').version" # Set the path to the package.json file
CHANGELOG="CHANGELOG.md"                    # Set the path to the CHANGELOG.md file
GIT_REPO_PATH="."                           # Set the Git repository path (current directory by default)
VERSION=$(npm run version --silent)         # Package (JSON) version updates
VERSIONING=$(node -p -e $PACKAGE)           # NPM Version
RELEASE_DATE=$(date +%d-%m-%Y" "%H:%M:%S)   # Set the release date (optional)

#? Function to update the CHANGELOG.md file
update_changelog() {
    LATEST=$(git rev-parse HEAD) # Get the latest commit hash

    #? Get the commit logs since the last release
    LOGS=$(git log --pretty=format:"- %s" "$LATEST" [[ -n "$VERSION" ]] && "^$VERSION" || "")

    #? Create a new section in the CHANGELOG.md file
    if [ -n "$VERSION" ]; then
        HEADER="## [$VERSION]"
        if [ -n "$RELEASE_DATE" ]; then
            HEADER="$HEADER ($RELEASE_DATE)"
        fi
        echo "$HEADER" >>"$CHANGELOG"
    else
        echo "## [Unreleased]" >>"$CHANGELOG"
    fi

    #? Add the commit logs to the CHANGELOG.md file
    echo "$LOGS" >>"$CHANGELOG"
    echo "" >>"$CHANGELOG"
}

cd "$GIT_REPO_PATH" # Change to the Git repository directory
update_changelog    # Update the CHANGELOG.md file

echo "CHANGELOG.md updated successfully!"
