const readCompressed = (input) => {
  let chars = []

  for (const symbol of input) {
    const secondCharCode = symbol.charCodeAt(1)
    chars.push(symbol.charCodeAt(0))
    if (secondCharCode) {
      console.log('Second character code found')
      console.log('First character code:')
      console.log(symbol.charCodeAt(0))
      console.log('Second character code:')
      console.log(secondCharCode)
    }
  }

  const weightPlaces = 1 // || 2 || parseInt(input[0], 10) // weird hack seems to work
  const frequenciesLength = input[1].charCodeAt(0) * 1.5 // weird hack seems to work
  const inputFrequencies = chars.slice(2, frequenciesLength + 2)
  const compressedText = input.slice(frequenciesLength + 2)

  return { weightPlaces, inputFrequencies, compressedText}
}

const unicodeToWeight = (characters) => characters.split('').map((char) => char.charCodeAt(0)).join('')

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
  readCompressed,
  formatFrequencies
}
