const multer = require('multer')
const resizeImage = require('../ultils/resizeImage')

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
        return res.status(400).send({ error: 'Image type node valid' })
      }
      file.extendtion = file.originalname.match(/\.[0-9a-z]+$/i)[0]
      cb(null, req.params.userId + '-' + Date.now() + file.extendtion)
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
    req.file.path = process.env.SERVER + '/uploads/avatar/' + req.file.filename
    next()
  })
}
exports.resizeAvatar = (req, res, next) => {
  const path = req.file.destination + '/' + req.file.filename
  const size = {width: 512, height: 512}
  resizeImage(path, size)
  console.log(req.file)
  next()
}

exports.uploadPostImage = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.cwd() + '/public/uploads/post')
    },
    filename: (req, file, cb) => {
      if (
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png'
      ) {
        return res.status(400).send({ error: 'Image type node valid' })
      }
      file.extendtion = file.originalname.match(/\.[0-9a-z]+$/i)[0]
      cb(null, req.postModel._id + '-' + Date.now() + file.extendtion)
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
    } else {
      if (!req.file) return res.status(400).send({error: 'Post image are required'})
      req.file.path = process.env.SERVER + '/uploads/post/' + req.file.filename
      next()
    }
  })
}
exports.resizePostImage = (req, res, next) => {
  const path = req.file.destination + '/' + req.file.filename
  const size = {width: 1024, height: 512}
  resizeImage(path, size)
  next()
}