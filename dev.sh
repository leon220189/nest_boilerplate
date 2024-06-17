#!/usr/bin/env bash

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )
cd ${CWD}

function nodeContainer {
    docker run --rm -v $(pwd):/app -w /app node:16-alpine npm install
}

function up {
    docker compose -f docker-compose.yml up -d
    echo "App starting"
}

function down {
    docker compose -f docker-compose.yml down
    echo "App down"
}

if [[ $# == 0 ]]; then
    nodeContainer
    exit 0
fi

while [[ $# -gt 0 ]]; do
    case "${1}" in
        up)
            up
            exit $?
        ;;
        down)
            down
            exit 0
        ;;
        *)
            echo "Unknown parameter: ${1}"
            # printHelp
            exit 1
        ;;
    esac

    shift
done