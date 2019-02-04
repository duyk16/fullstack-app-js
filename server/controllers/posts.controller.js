const PostModel = require('../models/post.model')

exports.createPost = async (req, res) => {
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
exports.getAllPosts = (req, res) => {
  let limit = req.query.limit && req.query.limit < 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page - 1 : 0;
  }

  PostModel.find()
    .limit(limit)
    .skip(limit * page)
    .select('-__v')
    .then(result => res.status(200).send({
      status: 'success',
      data: result
    }))
    .catch(err => {
      console.log(err)
      return res.status(400).send({error: 'Not found'})
    })
}
exports.getPostsByUser = (req, res) => {
  let limit = req.query.limit && req.query.limit < 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page - 1 : 0;
  }
  
  PostModel.find({owner: req.params.userId})
    .limit(limit)
    .skip(limit * page)
    .select('-__v')
    .then(result => res.status(200).send({
      status: 'success',
      data: result
    }))
    .catch(err => {
      console.log(err)
      return res.status(400).send({error: 'Not found'})
    })
}
exports.getPostById = (req, res) => {
  PostModel.findById({_id: req.params.postId})
    .select('-__v')
    .then(data => res.status(200).send({
      status: 'success',
      data
    }))
    .catch(err => {
      console.log(err);
      res.status(500).send('Not found')
    })
}
exports.patchById = (req, res) => {
  let post = req.postModel
  console.log(post);
  
  post.title = req.body.title,
  post.content = req.body.content,
  post.image = req.file.path

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
exports.removeById = (req, res) => {
  PostModel.findByIdAndRemove({_id: req.params.postId})
    .then((data) => res.status(204).send({
        status: 'Delete success',
        data
      }))
      .catch((error) => res.status(400).send({
        error: 'Delete fail',
      }))
}