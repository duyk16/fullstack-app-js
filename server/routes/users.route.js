const express = require('express')
const route = express.Router()

const userController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

const verifyUserMiddleware = require('../middlewares/verify.user.middleware')
const authUserMiddleware = require('../middlewares/auth.user.middlerware')
const uploadMiddleware = require('../middlewares/upload.middlerware')

route.post('/', [
  verifyUserMiddleware.hasRegiterFields,
  verifyUserMiddleware.hasUserExist,
  userController.createUser
])
route.get('/', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1), // 1 = User
  userController.getListUsers
])
route.get('/:userId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1), // 1 = User
  userController.getById
])
route.patch('/:userId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  userController.patchById,
])
route.delete('/:userId', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(3), // 3 = Admin
  userController.removeById
])
route.post('/:userId/upload/avatar', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  uploadMiddleware.uploadAvatar,
  uploadMiddleware.resizeAvatar,  // resize to 512 x 512
  userController.updateAvatar
])
route.post('/login', [
  verifyUserMiddleware.hasAuthFields,
  verifyUserMiddleware.isPasswordAndUserMatch,
  authController.login
])

module.exports = route