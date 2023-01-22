const Router = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const Asset = require('../../models/Asset');
const router = new Router();
const multer = require('multer');
const {Storage} = require('@google-cloud/storage');
const path = require('path');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(' ', '')}`)
  }
});
const upload = multer({
  storage,
});

const gc = new Storage({
  keyFilename: path.join(__dirname, '../../config/api-hotels-reservations-9c2559098543.json'),
  projectId: 'api-hotels-reservations',
})

const bucket = gc.bucket('hotels-reservations-assets');

router.post('/', authMiddleware, upload.array('files'), async (req, res) => {
  try {
    const promises = req.files.map(async (file) => {
      await bucket.upload(file.path)
      const asset = new Asset({path: `https://storage.googleapis.com/hotels-reservations-assets/${file.filename}`})
      await asset.save();
      return asset;
    })

    return Promise.all(promises).then((data) => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
