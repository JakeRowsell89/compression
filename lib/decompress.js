const toStuffedBinaryString = (symbol) => {
  let significantBits = (symbol).toString(2)
  let reps = significantBits.length % 16 === 0 ? 0 : 16 - significantBits.length % 16

  return ('0'.repeat(reps)) + significantBits
}

const decompressEncoded = (characters) => {
  let bitString = ''

  for (symbol of characters) {
    bitString += toStuffedBinaryString(symbol.codePointAt(0))

    if (symbol.codePointAt(1)) {
      bitString += toStuffedBinaryString(symbol.codePointAt(1))
    }
  }

  return bitString.replace(/^0+1/, '')
}

module.exports = {
  decompressEncoded
}
