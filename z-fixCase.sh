#!/bin/bash

# Directory containing the .ts files
directory="src/services/project-plus"

# Find .ts files in the specified directory
find "$directory" -type f -name '*.ts' | while read -r file; do
    # Extract the file name without the path
    filename=$(basename "$file")

    # Convert camelCase to PascalCase
    new_filename=$(echo "$filename" | sed -r 's/([a-z])([A-Z])/\1\2/g; s/^./\U&/')

    # Rename the file
    mv "$file" "$directory/$new_filename"
    echo "Renamed: $filename to $new_filename"
done
