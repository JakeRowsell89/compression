const weightAscending = (a, b) => a.weight > b.weight ? 1 : -1

const sortFrequenciesByWeight = (frequencies) => frequencies.sort(weightAscending)

const convertFrequenciesToArray = (frequenciesObject) => {
  const createFrequencyNode = (key) => { return { characters: key, weight: frequenciesObject[key] } }

  return Object.keys(frequenciesObject).map(createFrequencyNode)
}

module.exports = {
  weightAscending,
  sortFrequenciesByWeight,
  convertFrequenciesToArray
}
