const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../models/first_model')

router.get('/', verify, async (req, res) => {
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkwNmRmM2VkYzFmNDU4YzYxOTZjY2QiLCJpYXQiOjE2MDMzMDIxOTh9.vV_xEYaychOicOyj5qB-z6OK4Iaz9s0duLeoM1h_8TI
  const findTheUserWhoIsMakingTheRequestUsingTheJWTToken = await User.findOne({
    _id: req.user._id,
  })
  if (findTheUserWhoIsMakingTheRequestUsingTheJWTToken)
    return res.json(findTheUserWhoIsMakingTheRequestUsingTheJWTToken)
  res.send('Not Found')
})

module.exports = router
