const express     = require('express');
const app         = express();
const cors        = require('cors')
const morgan      = require('morgan');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

// Import Routes
const userRoutes = require('./routes/users.route')
const postRoutes = require('./routes/posts.route')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)

// Handler 404 Request
app.use((req, res) => {
  res.status(404).send('Not found')
})

module.exports = app;