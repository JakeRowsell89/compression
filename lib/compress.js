const compressEncoded = (bitString) => {
	bitString = '01' + bitString
	let compressed = ''
	let reps = bitString.length % 16 === 0 ? 0 : 16 - bitString.length % 16
	let paddedString = "0".repeat(reps) + bitString

	for (let i = 0; i < paddedString.length; i += 16) {
		let number = parseInt(paddedString.slice(i, i + 16), 2)
		compressed += String.fromCodePoint(number)
	}

	return compressed
}

module.exports = compressEncoded