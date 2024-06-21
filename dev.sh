#!/usr/bin/env bash

CWD=$( cd "$( dirname "${BASH_SOURCE[0]}" )/" && pwd )
cd ${CWD}

function nodeContainer {
    docker run --rm -v $(pwd):/app -w /app node:18-alpine npm install
}

function up {
    docker compose -f $1 up -d
    echo "App starting with $1"
}

function down {
    docker compose -f $1 down
    echo "App down with $1"
}

if [[ $# == 0 ]]; then
    nodeContainer
    exit 0
fi

while [[ $# -gt 0 ]]; do
    case "${1}" in
        up)
            up $2
            exit $?
        ;;
        down)
            down $2
            exit 0
        ;;
        *)
            echo "Unknown parameter: ${1}"
            exit 1
        ;;
    esac
    shift
done
