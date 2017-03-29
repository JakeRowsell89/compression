const fs = require('fs')
const { encodeCharacterString, getCharacterFrequencies } = require('./encode')
const { sortFrequenciesByWeight, convertFrequenciesToArray } = require('./util')
const { constructTreeWithFrequencies } = require('./tree')
const { compressEncoded } = require('./compress')
const { decompressEncoded } = require('./decompress')
const { decodeCharacterString } = require('./decode')
const { format } = require('./output')
const { readCompressed, formatFrequencies } = require('./input')
const { writeToFile } = require('./writefile')
const { ENCODING_OUT, ENCODING_IN, EXTENSION } = require('./constants')

const writeOut = (target, data, encoding) => {
  // Insert checks for duplicate file prevention
  writeToFile(target, data, encoding)
}

const readCompressedFile = (data) => {
  const { inputFrequencies, compressedText } = readCompressed(data)
  const formattedInputFrequencies = formatFrequencies(inputFrequencies)
  const newTree = constructTreeWithFrequencies(formattedInputFrequencies)
  const decompressed = decompressEncoded(compressedText)
  const decoded = decodeCharacterString(newTree, decompressed)

  return decoded
}

const readSourceFile = (data) => {
  const charFrequencies = getCharacterFrequencies(data)
  const frequencies = sortFrequenciesByWeight(convertFrequenciesToArray(charFrequencies))
  const tree = constructTreeWithFrequencies(frequencies)
  const encoded = encodeCharacterString(tree, data)
  const compressed = compressEncoded(encoded)
  const output = format(frequencies, compressed, data.length)

  return output
}

const readFile = (err, data, cb) => {
  if (err) throw err
  return cb(data)
}

const compress = (err, data, target) => {
  const output = readFile(err, data, readSourceFile)
  writeOut(target + '.' + EXTENSION, output, ENCODING_OUT)
}

const decompress = (err, data, target) => {
  const output = readFile(err, data, readCompressedFile)
  writeOut(target.replace('.' + EXTENSION, ''), output, ENCODING_IN)
}

const readFromFile = (fileTarget, mode) => {
  if (fileTarget && mode === 'compress') {
    fs.readFile(fileTarget, ENCODING_IN, (e, data) => compress(e, data, fileTarget))
  } else if (fileTarget && mode === 'decompress') {
    fs.readFile(fileTarget, ENCODING_OUT, (e, data) => decompress(e, data, fileTarget))
  }
}

module.exports = {
  readCompressedFile,
  readSourceFile,
  readFile,
  readFromFile
}
