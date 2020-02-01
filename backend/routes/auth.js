const bcrypt = require('bcrypt')
const express = require('express')
const {User} = require('../models/user')

// Router de Express
const router = express.Router()

router.post('/', async(req, res) => {

  let user = await User.findOne({email: req.body.email})
  if(!user) return res.status(400).send("Usuario o contraseña no válidos!")

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).send("Usuario o contraseña no válidos!")

  const jwtToken = user.generateJWT()

  res.status(200).send({jwtToken})

})

module.exports = router