const decodeCharacterString = (treeOriginal, bitString) => {
	let characterString = ''
	let tree = JSON.parse(JSON.stringify(treeOriginal))
	let i = 0
	while (i <= bitString.length) {
		if (tree.characters.length === 1) {
			characterString += tree.characters
			tree = JSON.parse(JSON.stringify(treeOriginal))
		} else {
			tree = tree[bitString[i]]
			i++
		}
	}
	return characterString
}

module.exports = decodeCharacterString
