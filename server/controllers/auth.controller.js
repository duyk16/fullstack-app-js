const crypto = require('crypto')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  try {
    let refreshId = req.body.userId + process.env.JWT_SECRET
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64")
    req.body.refreshKey = salt

    let token = jwt.sign(req.body, process.env.JWT_SECRET)
    let b = new Buffer.from(hash);
    let refreshToken = b.toString('base64')
    return res.status(201).send({
      userId: req.body.id,
      accessToken: token,
      refreshToken: refreshToken
    })

  } catch (e) {
    return res.status(500).send({
      errors: 'Unknow error'
    })
  }
}