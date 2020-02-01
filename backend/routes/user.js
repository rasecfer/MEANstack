const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const {User} = require('../models/user')

router.post('/', async(req, res) => {
  let user = await User.findOne({email: req.body.email})
  if(user) return res.status(400).send("Ya existe un usuario con ese email!")

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })

  const result = await user.save()

  const jwtToken = user.generateJWT()

  res.status(201).send({
    jwtToken
  })

})

module.exports = router