const readCompressed = (input) => {
  let chars = []

  for (const symbol of input) {
    chars.push(symbol.codePointAt(0))
    if (symbol.codePointAt(1)) {
      chars.push(symbol.codePointAt(1))
      console.log('found a merged character')
    }
  }
  console.log('Reading ' + chars.length + 'compressed characters')

  // const weightPlaces = 1 // || 2 || parseInt(input[0], 10) // weird hack seems to work
  const frequenciesLength = input[1].codePointAt(0) * 1.5 // weird hack seems to work
  console.log(frequenciesLength)
  const inputFrequencies = chars.slice(2, frequenciesLength + 2)
  const compressedText = input.slice(frequenciesLength + 2)

  return { inputFrequencies, compressedText }
}

// const unicodeToWeight = (characters) => characters.split('').map((char) => char.charCodeAt(0)).join('')

const formatFrequencies = (inputFrequencies) => {
  let result = []
  console.log('Input frequencies length ' + inputFrequencies.length)
  for (var i = 0; i < inputFrequencies.length; i += 3) {
    result.push({
      characters: String.fromCodePoint(inputFrequencies[i]),
      weight: inputFrequencies[i + 2]
    })
  }

  return result
}

module.exports = {
  readCompressed,
  formatFrequencies
}
