const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  image: String,
  comments: [
    {
      content: String,
      date: {
        type: Date,
        default: Date.now
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Posts', postSchema)