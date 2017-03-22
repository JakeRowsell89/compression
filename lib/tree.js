const { weightAscending } = require('./util')

const constructTreeWithFrequencies = (frequenciesArray) => {
  if (frequenciesArray.length === 1) {
    return frequenciesArray[0]
  } else {
    const nodes = [frequenciesArray[0], frequenciesArray[1]].sort(weightAscending)
    const remainder = frequenciesArray.slice(2)
    const newNode = {
      weight: nodes[0].weight + nodes[1].weight,
      characters: nodes[0].characters + nodes[1].characters,
      '0': nodes[0],
      '1': nodes[1]
    }
    const newFront = remainder.filter(el => el.weight <= newNode.weight)
    const newEnd = remainder.filter(el => el.weight > newNode.weight)

    return constructTreeWithFrequencies(newFront.concat(newNode, newEnd))
  }
}

module.exports = {
  constructTreeWithFrequencies
}
