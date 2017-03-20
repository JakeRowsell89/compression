const Compress = require('./compress')

const encodeWeight = (weight, weightPlaces) => {
	const sizePerPlace = 16
	const unPaddedWeight = (weight).toString(2)
	const reps = sizePerPlace * weightPlaces - unPaddedWeight.length 
	const paddedWeight = '0'.repeat(reps) + unPaddedWeight 

	return Compress.compressEncoded(paddedWeight)
}

const compressFrequencies = (frequencies, weightPlaces) => {
	return frequencies.map(node => {
		return [node.characters, encodeWeight(node.weight, weightPlaces)].join('')
	}).join('')
}

const format = (frequencies, compressed, length) => {
	let weightPlaces = 1
	// if (length > 65535) { // max length 4294836225
	// 	weightPlaces = 2
	// }
	const frequenciesLength = String.fromCodePoint(frequencies.length + (weightPlaces * frequencies.length))
	const compressedFrequencies = compressFrequencies(frequencies, weightPlaces)

	return [weightPlaces, frequenciesLength, compressedFrequencies, compressed].join('')
}

module.exports = {
	format: format
}