#!/bin/bash

set -ex
rm -r docs/*
node generate.js
npm run release
