const multer = require('multer')


exports.upload = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + '/public/uploads/post')
    },
    filename: (req, file, cb) => {
      // if (
      //   file.mimetype !== 'image/jpeg' &&
      //   file.mimetype !== 'image/png'
      // ) {
      //   return res.status(400).send({
      //     error: 'Image type node valid'
      //   })
      // }
      file.extendtion = file.originalname.match(/\.[0-9a-z]+$/i)[0]
      cb(null, file.fieldname + '-' + Date.now() + file.extendtion)
    }
  })

  const upload = multer({
    storage,
  }).single('avatar')

  upload(req, res, function(err) {
    if (err) return console.log(err);
    next()
  })
}
