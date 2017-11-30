#!/bin/sh
OUTDIR=$PWD/dist/node
BABEL=$PWD/node_modules/.bin/babel

mkdir -p $OUTDIR/server/js &&
mkdir -p $OUTDIR/shared/js &&
mkdir -p $OUTDIR/data &&

cp -R src/data/* $OUTDIR/data &&

if [ "$NODE_ENV" = "production" ]
then
OPTIONS="--minified --compact=true"
else
OPTIONS="-s"
fi

$BABEL $OPTIONS --out-dir=$OUTDIR/server/js src/server/js &&
$BABEL $OPTIONS --out-dir=$OUTDIR/shared/js src/shared/js
