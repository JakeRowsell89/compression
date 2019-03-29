Summary:
Based on Huffman's trees we can encode pieces of text into their binary traversal paths rather than their character codes. This requires a tree customised for the text to be compressed, as well as a binary string to traverse said tree. The aim of this project is to encode both the tree and the text to enable sending of a single file that can be interpreted to construct the tree and generate the decoded output.

Structure of a file:

Development:
With the command `npm run dev` you can start listening to file changes and run automated tests against all changes made. Tests are in the `test` folder and are named to match the file they are testing, with `.test` infixed between the file name and extension.

All changes are also linted with to Standard JS, and linting and tests must pass to allow commits.

List filesizes:
`ls -lhSr`

Ty it out, create a copy:
`cp readme.md copied-readme`
Compress the copy:
`node index.js copied-readme`
Remove the uncompressed copy:
`rm copied-readme`
Decompress the compressed file:
`node index.js copied-readme.jzip`
Compare the outputs:
`diff <(cat copied-readme) <(cat readme.md)`