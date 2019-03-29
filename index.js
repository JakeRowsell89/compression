#! /usr/bin/env node

const { readFromFile } = require('./lib/readfile')
const fileTarget = process.argv[2]
const mode = /\.jzip$/i.test(fileTarget) ? 'decompress' : 'compress'

readFromFile(fileTarget, mode)
