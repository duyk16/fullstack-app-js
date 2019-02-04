
exports.hasFieldsToCreate = (req, res, next) => {
  if (
    req.body.title &&
    req.body.content
  ) {
    return next()
  } else return res.status(400).send({
    errors: 'Request is not valid'
  })
}