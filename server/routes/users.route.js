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
route.get('/:id', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1), // 1 = User
  authUserMiddleware.sameId,
  userController.getById
])
route.patch('/:id', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1),
  authUserMiddleware.sameId,
  userController.patchById,
])
route.delete('/:id', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(3), // 3 = Admin
  userController.removeById
])

route.post('/upload', [
    // authUserMiddleware.validJWTNeeded,
    // authUserMiddleware.minLevelRequired(1),
    // authUserMiddleware.sameId,
    uploadMiddleware.upload('avatar'),
    userController.uploadAvatar
])

route.post('/auth', [
  verifyUserMiddleware.hasAuthFields,
  verifyUserMiddleware.isPasswordAndUserMatch,
  authController.login
])

module.exports = route