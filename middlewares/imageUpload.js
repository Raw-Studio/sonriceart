const path = require('path')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const validator = require('validator')
const uuid = require('uuid')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sonriceart-storage',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => file.fieldname + '-' + Date.now() + path.extname(file.originalname),
  },
});

const fileFilter = (req, file, cb) => {
  req.body.title = req.body.title.trim()

  const validationErrors = []
  if (!validator.isLength((req.body.title), { min: 2 })) {
    validationErrors.push('invalid title body')
  }
  req.validationErrors = validationErrors

  if ((file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/jpeg') &&
    validationErrors.length === 0) {
    cb(null, true)
  } else {

    cb(null, false)
  }
}

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    fieldSize: 25 * 1024 * 1024
  },
  fileFilter: fileFilter
});


module.exports = { upload }