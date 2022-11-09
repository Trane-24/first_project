const { Schema, model, ObjectId } = require('mongoose');

const HotelType = new Schema({
  name: { type: String, require: true },
  image: { type: ObjectId, ref: 'Asset' },
  description: { type: String },
});

module.exports = model('HotelType', HotelType);
