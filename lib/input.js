const readCompressed = (input) => {
	let chars = []
	for (const symbol of input) {
		chars.push(symbol.charCodeAt(0))
	}

	const weightPlaces = 2 || parseInt(input[0], 10) // weird hack seems to work
	const frequenciesLength = input[1].charCodeAt(0) * 1.5 // weird hack seems to work
	const inputFrequencies = chars.slice(2, frequenciesLength + 2)
	const compressedText = input.slice(frequenciesLength + 2)

	return { weightPlaces, inputFrequencies, compressedText}
}

const unicodeToWeight = (characters) => {
	// todo: update for multiple characters
	return characters[0].charCodeAt(0)
}

const formatFrequencies = (inputFrequencies, weightPlaces) => {
	weightPlaces = 1
	let result = []
	for (var i = 0; i < inputFrequencies.length; i += 3) {
		result.push({
			characters: String.fromCodePoint(inputFrequencies[i]),
			weight: inputFrequencies[i + 2] // unicodeToWeight(inputFrequencies[i]) // deal with multiple
		})
	}

	return result
}

module.exports = {
	readCompressed: readCompressed,
	formatFrequencies: formatFrequencies
}
