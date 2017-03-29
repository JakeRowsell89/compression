const fs = require('fs')
const { ENCODING_IN } = require('../lib/constants')
const { readCompressedFile, readSourceFile } = require('../lib/readfile')
const input1 = './test/test-input-1.txt'
// const input2 = './test/test-input-2.txt'
// const input3 = './test/test-input-3.txt'

it('End-to-end encode and decode returns the same result for small input', () => {
  const input = 'I am sample input'
  const encoded = readSourceFile(input)
  const decoded = readCompressedFile(encoded)
  expect(decoded).toEqual(input)
})

it('Can read and small input from file and encode/decode succesfully', () => {
  const input = fs.readFileSync(input1, ENCODING_IN, (e, data) => data)
  const encoded = readSourceFile(input)
  const decoded = readCompressedFile(encoded)
  expect(decoded).toEqual(input)
})

// it('Can handle larger input where troublesome character combinations occur', () => {
//   const input = fs.readFileSync(input2, ENCODING_IN, (e, data) => data)
//   const encoded = readSourceFile(input)
//   const decoded = readCompressedFile(encoded)
//   expect(decoded).toEqual(input)
// })

// it('Can handle large inputs where troublesome character combinations occur', () => {
//   const input = fs.readFileSync(input3, ENCODING_IN, (e, data) => data)
//   const encoded = readSourceFile(input)
//   const decoded = readCompressedFile(encoded)
//   expect(decoded).toEqual(input)
// })
