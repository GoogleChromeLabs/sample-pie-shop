#!/bin/sh
SASS=node_modules/.bin/node-sass
OUTDIR=dist/static/styles
OUTFILE=$OUTDIR/style.css
INFILE=src/client/styles/style.scss

mkdir -p $OUTDIR &&
$SASS -o $OUTDIR --source-map=true --output-style=compressed $INFILE > $OUTFILE
