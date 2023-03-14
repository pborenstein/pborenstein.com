#! /usr/bin/env bash
#
#   This script is intended to get changes
#   from a template repo into a repo
#   made from said template

source="."
dest="$1"

if [[ ! -f $dest/.eleventy.js && ! -f $dest/eleventy.config.js ]] ; then
  echo "missing .eleventy.js"
  echo "start with a clone of the repo"
  exit
fi

echo Synching from $source to $dest
echo

rsync -av --exclude=".git/" \
          --exclude=".*" \
          --exclude="dist/" \
          --exclude="node_modules/" \
          --exclude="README.md" \
          --exclude="src/posts" \
          --exclude="src/data/config.json" \
          --exclude="package-lock.json" \
      $source \
      $dest
