const mongoose = require('mongoose')
const crypto = require('crypto')

const UserModel = require('../models/user.model')

exports.createUser = (req, res) => {
  let {firstName, lastName, email, password} = req.body

  // Create salt + hash
  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
  password = salt + "$" + hash;

  // Create new user
  let user = new UserModel({firstName, lastName, email, password})
  user.save()
    .then(data => {
      return res.status(201).send({
        status: "success",
        email: data.email,
        firstName: data.firstName,
        userId: data._id
      })
    })
    .catch(e => res.status(500).send())
}
exports.getListUsers = (req, res) => {
  let limit = req.query.limit && req.query.limit < 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page - 1 : 0;
  }

  UserModel.find()
    .limit(limit)
    .skip(limit * page)
    .select('-__v -password')
    .then(result => res.status(200).send(result))
    .catch(err => {
      console.log(err)
      return res.status(400).send({error: 'Not found'})
    })
}
exports.getById = (req, res) => {
  UserModel.findById({_id: req.params.userId})
    .select('-__v -password')
    .then(data => res.status(200).send({
      status: 'success',
      data
    }))
    .catch(() => res.status(500).send('Not found'))
}
exports.patchById = async (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64')
    req.body.password = salt + '$' + hash
  }

  let user = await UserModel.findById(req.params.userId)
  if (!user) return res.status(400).send({
    error: 'ID not found'
  })

  // Modify data
  for (let i in req.body) {
    user[i] = req.body[i]
  }

  try {
    user.save()
    return res.status(204).send({
      status: 'success'
    })
  } catch (error) {
    return res.status(500).send(error)
  }

}
exports.removeById = (req, res) => {
  UserModel.findByIdAndRemove({
      _id: req.params.userId
    })
    .then((data) => res.status(204).send({
      status: 'Delete success',
      data
    }))
    .catch((error) => res.status(400).send({
      error: 'Delete fail',
    }))
}

exports.updateAvatar = (req, res) => {
  UserModel.updateOne({_id: req.params.userId}, {avatar: req.file.path})
    .then(() => {
      return res.status(201).send({
        status: 'success',
        data: {
          userId: req.params.userId,
          imageType: req.file.mimetype,
          path: req.file.path
        }
      })
    })
    .catch(err => res.status(500).send({error: 'Write data fail'}))
}