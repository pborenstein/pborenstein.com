#! /usr/bin/env bash

source="$HOME/projects/fresh/"
dest="$1"

echo source $source
echo dest $dest

rsync -av --exclude=".git/" \
          --exclude=".*" \
          --exclude="package.json" \
          --exclude="package-lock.json" \
          --exclude="node_modules/" \
          --exclude="dist/" \
          --exclude="src/posts" \
          --exclude="README.md" \
          --exclude="src/assets/css/colors.css" \
          --exclude="src/assets/css/swatches.md" \
          --exclude="src/assets/css/local.css" \
          --exclude="src/_data/config.json" \
          --exclude="src/_data/git.js" \
          --exclude="src/_includes/partials/icons.njk" \
          --exclude="src/_includes/partials/logo.njk" \
          --exclude="src/pages/about.md" \
      $source \
      $dest
