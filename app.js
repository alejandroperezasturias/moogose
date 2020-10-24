const express = require('express')
const app = express()
app.listen(4001)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv/config')

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('connected to DB!')
})

// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts_private')
// Middleware

app.use(bodyParser.json())
app.use('/user', authRoute)
app.use('/posts', postRoute)
