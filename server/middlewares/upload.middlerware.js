const multer = require('multer')


exports.upload = (kind) => {
  return (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, process.cwd() + '/public/uploads/' + kind)
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
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
}