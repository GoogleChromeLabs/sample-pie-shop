#!/bin/sh
OUTDIR=$PWD/dist/node
BABEL=$PWD/node_modules/.bin/babel

mkdir -p $OUTDIR/server/js &&
mkdir -p $OUTDIR/shared/js &&
mkdir -p $OUTDIR/shared/partials &&
mkdir -p $OUTDIR/data &&
cp -R src/shared/js/* $OUTDIR/shared/js &&
cp -R src/shared/partials/* $OUTDIR/shared/partials &&
cp -R data/* $OUTDIR/data &&
# Change into server directory to pick up server Babel config.
cd src/server &&
$BABEL --minified -s --compact=true --out-dir=$OUTDIR/server/js js
# TODO: Add back in once we have shared code.
#&& $BABEL --minified -s --compact=true --out-dir=$OUTDIR/shared/js ../shared/js
