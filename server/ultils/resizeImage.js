const sharp = require('sharp')
const fs = require('fs').promises

module.exports = function(path, size) {
  fs.readFile(path)
    .then(data => {
      sharp(data)
        .resize(size.width, size.height)
        .toBuffer()
        .then(fileBuffer => fs.writeFile(path, fileBuffer))
        .catch(err => console.log(err))
    })
  return
}