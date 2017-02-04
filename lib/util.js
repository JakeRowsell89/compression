const weightAscending = (a, b) => a.weight > b.weight ? 1 : -1

const sortFrequenciesByWeight = (frequencies) => frequencies.sort(weightAscending)

const convertFrequenciesToArray = (frequenciesObject) => {
	return Object.keys(frequenciesObject).map(key => {
		return {
			characters: key,
			weight: frequenciesObject[key]
		}
	})
}

module.exports = {
	weightAscending: weightAscending,
	sortFrequenciesByWeight: sortFrequenciesByWeight,
	convertFrequenciesToArray: convertFrequenciesToArray
}