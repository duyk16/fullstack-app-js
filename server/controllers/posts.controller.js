const PostModel = require('../models/post.model')

exports.initPostModel = (req, res, next) => {
  req.postModel = new PostModel({
    owner: req.params.userId
  })
  next()
}
exports.createPost = async(req, res) => {
  const post = new PostModel({
    _id: req.postModel._id,
    title: req.body.title,
    content: req.body.content,
    owner: req.postModel.owner,
    image: req.file.path
  })
  post.save()
    .then(result => {
      result.__v = undefined
      return res.status(201).send({status: 'success', data: result})
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({error: 'Save database error'})
    })
  
}