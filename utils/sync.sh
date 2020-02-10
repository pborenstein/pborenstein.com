#! /usr/bin/env bash

source="$HOME/projects/fresh/"
dest="$1"

echo source $source
echo dest $dest

rsync -av --exclude=".git/" \
          --exclude=".*" \
          --exclude="node_modules/" \
          --exclude="dist/" \
          --exclude="src/posts" \
          --exclude="README.md" \
          --exclude="src/assets/css/local.css" \
          --exclude="src/_data/config.json" \
          --exclude="src/_data/git.js" \
          --exclude="src/_includes/partials/icons.njk" \
          --exclude="src/_includes/partials/logo.njk" \
          --exclude="src/pages/about.md" \
      $source \
      $dest
