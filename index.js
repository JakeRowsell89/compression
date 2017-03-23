#! /usr/bin/env node

const { readFromFile } = require('./lib/readfile')
const fileTarget = process.argv[2]
const mode = /jzip/i.test(fileTarget) ? 'decompress' : 'compress'

readFromFile(fileTarget, mode)

// console.log('Compressed text matches')
// console.log(compressed === compressedText)
// console.log('Compressed Text before & after length match: ')
// console.log(compressed.length === compressedText.length)
// console.log('Trees are the same: ')
// console.log(JSON.stringify(tree) === JSON.stringify(newTree))
// console.log('Decompressed are the same')
// console.log(decompressed.length === encoded.length)
// console.log('Decoded and encoded match')
// console.log(decoded.length)

// console.log(decoded === STR)
// console.log('Original text: ')
// console.log(STR)
// console.log('Encoded without tree (Currently string 1|0 but represents bits): ')
// console.log(encoded)
// console.log('Original characters length: ')
// console.log(STR.length)
// console.log('Input bits length at 8/16/32 bit encodings')
// console.log(8 * STR.length + '/' + 16 * STR.length + '/' + 32 * STR.length)
// console.log('Encoded Bits length: ')
// console.log(encoded.length)
// console.log('Encoded and Compressed Tree + Text Bits length: ')
// console.log(compressed.length * 32)
// console.log('Encoded and compressed Tree + Text: ')
// console.log(compressed)
// console.log('Decompressed and Decoded text: ')
// console.log(decoded)
