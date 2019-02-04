const PostModel = require('../models/post.model')

exports.sameId = (req, res, next) => {
  PostModel.findById({_id: req.params.postId})
    .then(data => {
      if (!data) return res.status(400).send({
        error: 'Can not find Post'
      })
      if (data.owner != req.params.userId) {
        return res.status(403).send({
          error: 'Permission denied'
        })
      }

      req.postModel = data
      next()
    })
    .catch(() => res.status(500).send('Not found'))
}