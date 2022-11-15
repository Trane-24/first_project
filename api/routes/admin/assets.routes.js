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

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const asset = await Asset.findOne({_id: req.params.id});
    if (!asset) {
      return res.status(404).json({message: 'Image not found'});
    }
    fs.unlinkSync(asset.path);
    await asset.delete();
    return res.json({ message: 'Image was deleted' })
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
})

module.exports = router;
