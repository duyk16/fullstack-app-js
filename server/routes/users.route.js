const express = require('express')
const route = express.Router()

route.post('/')
route.get('/:id')
route.put('/:id')

route.post('/login')

module.exports = route