const crypto = require('crypto')

const UserModel = require('../models/user.model')

exports.hasAuthFields = (req, res, next) => {
  if (
    req.body.email &&
    req.body.password
  ) return next()
  
  else return res.status(400).send({
    error: 'Email and password are required'
  })
}
exports.isPasswordAndUserMatch = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({
      email: req.body.email
    })
    if (!user) return res.status(400).send({
      error: 'Email not found'
    })
    let passwordDB = user.password.split('$')
    let saltDB = passwordDB[0]
    let hash = crypto.createHmac('sha512', saltDB).update(req.body.password.toString()).digest('base64')
    if (hash == passwordDB[1]) {
      req.body = {
        id: user._id,
        email: user.email,
        permissionLevel: user.permissionLevel,
        provider: 'email',
        name: user.firstName + ' ' + user.lastName,
      }
      return next()
    } else return res.status(400).send({
      error: 'Password does not match'
    })
  } catch (e) {
    return res.status(400).send({
      error: 'Error does not define'
    })
  }
}
exports.hasRegiterFields = (req, res, next) => {
  const regexEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/ig
  if (
    req.body.firstName &&
    req.body.lastName &&
    regexEmail.test(req.body.email) &&
    req.body.password > 5
  ) return next()

  return res.status(400).send({
    error: "Some fields are not valid"
  })
}
exports.hasUserExist = async (req, res, next) => {
  let user = await UserModel.findOne({
    email: req.body.email
  })
  if (user) return res.status(400).send({
    error: 'Email was registed before'
  })

  return next()
}