const express = require('express')
const route = express.Router()

const postController = require('../controllers/posts.controller')

const authUserMiddleware = require('../middlewares/auth.user.middlerware')
const verifyPostMiddleware = require('../middlewares/verify.post.middleware')
const uploadMiddleware = require('../middlewares/upload.middlerware')


route.post('/:userId', [
  // authUserMiddleware.validJWTNeeded,
  // authUserMiddleware.minLevelRequired(1),
  // authUserMiddleware.sameId,
  postController.initPostModel,       // generate post ID to save image
  uploadMiddleware.uploadPostImage,   // field "image"
  uploadMiddleware.resizePostImage,   // 1024 x 512
  verifyPostMiddleware.hasFieldsToCreate,
  postController.createPost
])

module.exports = route