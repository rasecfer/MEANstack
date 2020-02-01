// Se declara la constante
const multer = require('multer')

// Se declara el directorio donde se almacenan los archivos
const DIR = './public/'

// Se declara el storage
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-')
    cb(null, filename)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if(file.mimetype = "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
      cb(null, true)
    }else{
      cb(null, false)
      return cb(new Error('Solo acepta .png, .jpg, y jpeg'))
    }
  }
})

module.exports = upload