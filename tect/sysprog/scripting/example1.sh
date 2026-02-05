#!/bin/bash

# if a file is created on linux
# we also need to run this:
# chmod +x exclaim.sh

# Check if at least one argument was provided
if [ $# -eq 0 ]; then
    echo "Error: No argument provided." >&2
    echo "Usage: $0 <string>" >&2
    exit 1
fi

result="${1}!"

echo "$result"
