const fs = require('fs')
const Encode = require('./lib/encode')
const Util = require('./lib/util')
const Tree = require('./lib/tree')
const Compress = require('./lib/compress')
const Decompress = require('./lib/decompress')
const Decode = require('./lib/decode')
const Output = require('./lib/output')
const Input = require('./lib/input')
const Buffer = require('buffer').Buffer
const EXTENSION = 'jzip'
const ENCODING_IN = 'utf8'
const ENCODING_OUT = 'utf16le'
const fileTarget = process.argv[2]
const mode = /jzip/i.test(fileTarget) ? 'decompress' : 'compress'
// const STR = "This is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaThis is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
// const STR = 'This is a piece of text that gets encoded, Mike Steel can not stop talking about the damn settings page. Settings page this, settings page that. :jeff: Also 㢕絙⼳熎恋涌'

const writeToFile = (file, data) => {
  const ENCODING_WRITE = mode === 'compress' ? ENCODING_OUT : ENCODING_IN
  const wstream = fs.createWriteStream(file, { encoding: ENCODING_WRITE })
  wstream.write(data)
  wstream.end()
}

const readCompressedFile = (err, data) => {
  if (err) throw err
  const { weightPlaces, inputFrequencies, compressedText} = Input.readCompressed(data)
  // console.log(weightPlaces)
  // console.log('---')
  // console.log(inputFrequencies)
  // console.log('---')
  // console.log(compressedText)
  // console.log('---')
  const formattedInputFrequencies = Input.formatFrequencies(inputFrequencies, weightPlaces)
  const newTree = Tree.constructTreeWithFrequencies(formattedInputFrequencies)
  const decompressed = Decompress.decompressEncoded(compressedText)
  // console.log(decompressed)
  const decoded = Decode.decodeCharacterString(newTree, decompressed)
  writeToFile(fileTarget.replace('.' + EXTENSION, ''), decoded)
}

const readInputFile = (err, data) => {
  if (err) throw err

  const charFrequencies = Encode.getCharacterFrequencies(data)
  const frequencies = Util.sortFrequenciesByWeight(Util.convertFrequenciesToArray(charFrequencies))
  const tree = Tree.constructTreeWithFrequencies(frequencies)
  const encoded = Encode.encodeCharacterString(tree, data)
  const compressed = Compress.compressEncoded(encoded)
  const output = Output.format(frequencies, compressed, data.length)
  writeToFile(fileTarget + '.' + EXTENSION, output)
}

if (fileTarget && mode === 'compress') {
  fs.readFile(fileTarget, ENCODING_IN, readInputFile)
} else if (fileTarget && mode === 'decompress') {
  fs.readFile(fileTarget, ENCODING_OUT, readCompressedFile)
}

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
