const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  comments: [{
    type: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
  }],
  image: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

postSchema.indexes({createdAt: -1})

module.exports = mongoose.model('Posts', postSchema)