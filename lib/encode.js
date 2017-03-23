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
  const getBitStringInTree = (character) => getBitStringForCharacter(tree, character)
  return characterString.split('').map(getBitStringInTree).join('')
}

const getCharacterFrequencies = (str) => {
  let frequencies = {}
  const updateFrequenciesMap = (char) => {
    frequencies[char] = frequencies[char] ? frequencies[char] : 0
    frequencies[char]++
  }

  str.split('').forEach(updateFrequenciesMap)

  return frequencies
}

module.exports = {
  getCharacterFrequencies,
  encodeCharacterString,
  getBitStringForCharacter
}
