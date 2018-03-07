#!/bin/sh
OUTDIR=dist/static
INDIR=src/client/images

mkdir -p $OUTDIR
cp -R $INDIR $OUTDIR
