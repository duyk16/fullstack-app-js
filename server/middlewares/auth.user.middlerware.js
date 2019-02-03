const jwt = require('jsonwebtoken')

exports.validJWTNeeded = (req, res, next) => {
  let authorization = req.headers.authorization
  if (!authorization) return res.status(401).send({error: 'Please login'})
  try {
    let auth = authorization.split(' ')
    if (auth[0] !== 'Bearer') return res.status(401).send({error: 'Authorize fail'})

    req.jwt = jwt.verify(auth[1], process.env.JWT_SECRET)
    return next()

  } catch (e) {
    return res.status(403).send({error: 'Authorize fail'})
  }
}
exports.minLevelRequired = (levelRequired) => {
  return (req, res, next) => {
    let userPermission = parseInt(req.jwt.permissionLevel)
    if (userPermission >= levelRequired) return next()
    else return res.status(403).send({
      error: 'Permission denied'
    })
  }
}
exports.sameId = (req, res, next) => {
  if (req.jwt.userId == req.params.userId) return next()
  return res.status(403).send({
    error: 'Permission denied'
  })
}