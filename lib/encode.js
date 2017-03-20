let characterToBitCache = {}

const getBitStringForCharacter = (treeOriginal, character) => {
	if (characterToBitCache[character] !== undefined) {
		return characterToBitCache[character]
	} else {
		let bitString = ''
		let tree = JSON.parse(JSON.stringify(treeOriginal))
		while (character !== tree.characters) {
			let side = '0'
			if (tree[side].characters.indexOf(character) === -1) {
				side = '1'
			}
			tree = tree[side]
			bitString += side
		}
		characterToBitCache[character] = bitString
		return bitString
	}
}

const encodeCharacterString = (tree, characterString) => {
	// console.log(characterString)
	// console.log(JSON.stringify(tree))
	let bitString = ''
	for (let i = 0; i < characterString.length; i++) {
		bitString += getBitStringForCharacter(tree, characterString[i])
	}
	// console.log(bitString)
	return bitString
}

const getCharacterFrequencies = (str) => {
	let frequencies = {}
	for (let i = 0; i < str.length; i++) {
		const char = str[i]
		if (frequencies[char]) {
			frequencies[char]++
		} else {
			frequencies[char] = 1
		}
	}

	return frequencies
}

module.exports = {
	getCharacterFrequencies: getCharacterFrequencies,
	encodeCharacterString: encodeCharacterString,
	getBitStringForCharacter: getBitStringForCharacter
}