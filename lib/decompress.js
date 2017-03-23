const decompressEncoded = (characters) => {
  let bitString = ''

  for (symbol of characters) {
    let significantBits = (symbol.codePointAt(0)).toString(2)
    let reps = significantBits.length % 16 === 0 ? 0 : 16 - significantBits.length % 16

    bitString += ('0'.repeat(reps)) + significantBits
  }

  return bitString.replace(/^0+1/, '')
}

module.exports = {
  decompressEncoded
}
