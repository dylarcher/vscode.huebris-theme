#!/bin/sh

set +x

red() {
    echo "\x1B[31m$1\x1B[0m"
}

green() {
    echo "\x1B[32m$1\x1B[0m"
}

yellow() {
    echo "\x1B[33m$1\x1B[0m"
}

purple() {
    echo "\x1B[34m$1\x1B[0m"
}

pink() {
    echo "\x1B[35m$1\x1B[0m"
}

blue() {
    echo "\x1B[36m$1\x1B[0m"
}

grey() {
    echo "\x1B[37m$1\x1B[0m"
}

bold() {
    echo "$(tput bold)$1$(tput sgr0)"
}

underline() {
    echo "$(tput smul)$1$(tput sgr0)"
}
