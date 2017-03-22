const { compressEncoded } = require('./compress')

const encodeWeight = (weight, weightPlaces) => {
  const sizePerPlace = 16
  const unPaddedWeight = (weight).toString(2)
  const reps = sizePerPlace * weightPlaces - unPaddedWeight.length
  const paddedWeight = '0'.repeat(reps) + unPaddedWeight

  return compressEncoded(paddedWeight)
}

const compressFrequencies = (frequencies, weightPlaces) => {
  return frequencies.map(node => {
    return [node.characters, encodeWeight(node.weight, weightPlaces)].join('')
  }).join('')
}

const format = (frequencies, compressed, length) => {
  let weightPlaces = 1
  // if (length > 65535) { // max length 4294836225
  //  weightPlaces = 2
  // }
  const toCode = frequencies.length + (weightPlaces * frequencies.length)
  const frequenciesLength = String.fromCodePoint(toCode)
  const compressedFrequencies = compressFrequencies(frequencies, weightPlaces)

  return [weightPlaces, frequenciesLength, compressedFrequencies, compressed].join('')
}

module.exports = {
  format
}
