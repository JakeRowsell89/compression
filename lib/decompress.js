const decompressEncoded = (characters) => {
	let bitString = ''

	for (let i = 0; i < characters.length; i++) {
		let significantBits = (characters.codePointAt(i)).toString(2)
		let reps = significantBits.length % 16 === 0 ? 0 : 16 - significantBits.length % 16

		bitString += ("0".repeat(reps)) + significantBits
	}

	return bitString.replace(/^0+1/, '')
}

module.exports = decompressEncoded
