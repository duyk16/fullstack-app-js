const express = require('express')
const route = express.Router()

const postController = require('../controllers/posts.controller')

const authUserMiddleware = require('../middlewares/auth.user.middlerware')
const authPostMiddleware = require('../middlewares/auth.post.middleware')
const verifyPostMiddleware = require('../middlewares/verify.post.middleware')
const uploadMiddleware = require('../middlewares/upload.middlerware')
const postMiddleware = require('../middlewares/post.middleware')

route.post('/:userId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  postMiddleware.initPostModel,         // generate post ID to save image
  uploadMiddleware.uploadPostImage,     // field "image"
  uploadMiddleware.resizePostImage,     // 1024 x 512
  verifyPostMiddleware.hasFieldsToCreate,
  postController.createPost
])
// Get all posts
route.get('/', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  postController.getAllPosts
])
// Get all posts by user
route.get('/:userId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  postController.getPostsByUser
])

route.get('/:userId/:postId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  postController.getPostById
])
route.patch('/:userId/:postId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  authPostMiddleware.sameId,
  uploadMiddleware.uploadPostImage,       // field "image"
  uploadMiddleware.resizePostImage,       // 1024 x 512
  verifyPostMiddleware.hasFieldsToCreate,
  postController.patchById
])
route.delete('/:userId/:postId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  authPostMiddleware.sameId,
  postController.removeById
])

module.exports = route