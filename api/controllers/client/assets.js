const Asset = require('../../models/Asset');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const gc = new Storage({
  keyFilename: path.join(__dirname, '../../config/api-hotels-reservations-9c2559098543.json'),
  projectId: 'api-hotels-reservations',
})

const bucket = gc.bucket('hotels-reservations-assets');

exports.post = async (req, res) => {
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
}
