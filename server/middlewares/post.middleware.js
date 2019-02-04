const PostModel = require('../models/post.model')

exports.initPostModel = (req, res, next) => {
  req.postModel = new PostModel({
    owner: req.params.userId
  })
  next()
}