const express = require('express')
const mongoose = require('mongoose')
const user = require('./routes/user')
const auth = require('./routes/auth')
const task = require('./routes/task')
// CORS
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/user/', user)
app.use('/api/auth/', auth)
app.use('/api/task/', task)

// Para dar acceso a la carpeta public
app.use('/public', express.static('public'))

const port = process.env.PORT || 2020
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))

mongoose.connect('mongodb://localhost/task', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})
    .then(()=> console.log('Conectado a MongoDb'))
    .catch(error => console.log('No se ha conetado a MongoDb'))