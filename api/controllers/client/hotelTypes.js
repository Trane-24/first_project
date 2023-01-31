const HotelType = require('../../models/HotelType');

exports.get = async (req, res) => {
  try {
    return await HotelType.find().populate('image', 'path')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}
