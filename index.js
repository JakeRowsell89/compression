import { getCharacterFrequencies, encodeCharacterString } from './lib/encode'
import { convertFrequenciesToArray, sortFrequenciesByWeight } from './lib/util'
import { constructTreeWithFrequencies } from './lib/tree'
import { compressEncoded } from './compress'
import { decompressEncoded } from './decompress'
import { decodeCharacterString } from './decode'


const str = "This is a string that is to be encoded. Let's see how that works. We can even add extra steps to encode our bits into unicode. This is actually only aesthetic, as javascript string characters are 16 bits per character. aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
console.log(str)
const charFrequencies = getCharacterFrequencies(str)
const frequencies = sortFrequenciesByWeight(convertFrequenciesToArray(charFrequencies))
const tree = constructTreeWithFrequencies(frequencies)
const encoded = encodeCharacterString(tree, str)
const compressed = compressEncoded(encoded)
const decompressed = decompressEncoded(compressed)
const decoded = decodeCharacterString(tree, encoded)



// make tree from string, convert to bit string, convert to unicode

console.log(decoded)