#!/bin/sh
OUTDIR=$PWD/dist/node
BABEL=$PWD/node_modules/.bin/babel

mkdir -p $OUTDIR/server/js &&
mkdir -p $OUTDIR/shared/js &&
# Change into server directory to pick up server Babel config.
cd src/server &&
$BABEL --minified -s --compact=true --out-dir=$OUTDIR/server/js js &&
$BABEL --minified -s --compact=true --out-dir=$OUTDIR/shared/js ../shared/js
