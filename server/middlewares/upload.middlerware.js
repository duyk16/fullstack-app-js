const multer = require('multer')


exports.uploadAvatar = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + '/public/uploads/avatar')
    },
    filename: (req, file, cb) => {
      if (
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png'
      ) {
        return res.status(400).send({error: 'Image type node valid'})
      }
      file.extendtion = file.originalname.match(/\.[0-9a-z]+$/i)[0]
      cb(null, req.params.id + '-' + Date.now() + file.extendtion)
    }
  })
  
  const upload = multer({
    storage, 
    limits: {
      fileSize: process.env.MAX_IMAGE_SIZE
    }
  }).single('image')

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).send('Error')
    }
    next()
  })
}
