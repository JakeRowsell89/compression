const { sortFrequenciesByWeight, convertFrequenciesToArray } = require('../lib/util')
const node1 = {
  characters: 'a',
  weight: 15
}
const node2 = {
  characters: 'b',
  weight: 22
}
const node3 = {
  characters: 'c',
  weight: 1102
}

it('Sorts by weight property ascending', () => {
  const nodes = [node3, node1, node2]
  expect(sortFrequenciesByWeight(nodes).map(n => n.characters).join('')).toBe('abc')
})

it('Can convert a frequencies object to an array of frequency nodes', () => {
  const frequencyObject = {
    'a': 15,
    'b': 22,
    'c': 1102
  }
  const resultArray = convertFrequenciesToArray(frequencyObject)

  expect(resultArray).toEqual([
    {
      characters: 'a',
      weight: 15
    },
    {
      characters: 'b',
      weight: 22
    },
    {
      characters: 'c',
      weight: 1102
    }
  ])
})
