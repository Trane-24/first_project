const assets = require('../controllers/admin/assets.js');
const clientAssets = require('../controllers/client/assets.js');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(' ', '')}`)
  }
});
const upload = multer({
  storage,
});

module.exports = (app) => {
  app.post('/api/admin/assets', authMiddleware, upload.array('files'), assets.post);

  app.post('/api/client/assets', authMiddleware, upload.array('files'), clientAssets.post);
};
