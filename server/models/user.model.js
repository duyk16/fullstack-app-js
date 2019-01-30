const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  email: {type: String, trim: true},
  password: String,
  permissionLevel: {
    type: Number,
    default: 1
  }
})

module.exports = mongoose.model('Users', userSchema)