#!/bin/sh
TESTS="test/server/**/*.test.js test/shared/**/*.test.js"
REQUIRES=test/server/requires.js
MOCHA=node_modules/.bin/mocha

$MOCHA -r $REQUIRES $TESTS
