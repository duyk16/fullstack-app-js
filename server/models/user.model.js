const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {type: String, trim: true, required: true},
  lastName: {type: String, trim: true, required: true},
  email: {type: String, trim: true, required: true},
  password: {type: String, required: true},
  avatar: {
    path: String,
    fileName: String,
  },
  permissionLevel: {
    type: Number,
    default: 1
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Users', userSchema)