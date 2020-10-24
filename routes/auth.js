const express = require('express')
const router = express.Router()
const User = require('../models/first_model')
const { registerValidation, loginValidation } = require('./validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res, next) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (err) {
    res.send(err)
  }
})

router.post('/register', async (req, res, next) => {
  // Let's validate the data before making a new user
  const error = await registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //   Check if EMAIL exits
  const userAlreadyExists = await User.findOne({ email: req.body.email })
  if (userAlreadyExists) return res.status(400).send('Email Already Exists')

  // Hash passwords
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save()
    res.json({ user: savedUser.id })
  } catch (err) {
    res.send(err)
  }
})

router.post('/login', async (req, res, next) => {
  // Let's validate the data before making a new user
  const error = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Check if EMAIL exits
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not Found')

  //   Check Valid Password
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid Password')

  //   Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router
