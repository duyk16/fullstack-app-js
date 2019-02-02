const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  email: {type: String, trim: true},
  password: String,
  avatar: String,
  permissionLevel: {
    type: Number,
    default: 1
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Users', userSchema)