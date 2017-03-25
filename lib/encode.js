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
  let characters = characterString.split('')
  let result = ''
  for (const symbol of characters) {
    if (symbol.codePointAt(1)) {
      console.log('Found a merged character in encoding')
      result += getBitStringInTree(String.fromCodePoint(symbol.codePointAt(0)))
      result += getBitStringInTree(String.fromCodePoint(symbol.codePointAt(1)))
    } else {
      result += getBitStringInTree(symbol)
    }
  }
  return result
  // return characterString.split('').map(getBitStringInTree).join('')
}

const getCharacterFrequencies = (str) => {
  let frequencies = {}
  const updateFrequenciesMap = (char) => {
    frequencies[char] = frequencies[char] ? frequencies[char] : 0
    frequencies[char]++
  }
  console.log('potential area of failure')
  // let characters = characterString.split('')

  for (const symbol of str) {
    if (symbol.codePointAt(1)) {
      console.log('a failure may be occurring')
    }
    updateFrequenciesMap(symbol)
  }
  // str.split('').forEach(updateFrequenciesMap)

  return frequencies
}

module.exports = {
  getCharacterFrequencies,
  encodeCharacterString,
  getBitStringForCharacter
}
