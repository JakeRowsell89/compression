const fs = require('fs')

const writeToFile = (file, data, encoding) => {
  const wstream = fs.createWriteStream(file, { encoding })
  wstream.write(data)
  wstream.end()
}

module.exports = {
  writeToFile
}
