#!/bin/bash#!/bin/bash



# ...existing code...paste "$1" "$2" | sed 's/\t/, /' > merged.txt# ...existing code...# ...existing code...
awk '{print $1 ", " $2}' "$1" "$2" > merged.txt
# ...existing code...
