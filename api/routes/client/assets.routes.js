const Router = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const Asset = require('../../models/Asset');
const router = new Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(' ', '')}`)
  }
});
const upload = multer({
  storage,
});

router.post('/', authMiddleware, upload.array('files'), async (req, res) => {
  try {
    const promises = [];
    req.files.map((file) => {
      promises.push(new Asset(file).save())
    })
    return Promise.all(promises).then((data) => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

module.exports = router;
