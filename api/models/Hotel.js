const { Schema, model } = require('mongoose');

const Hotel = new Schema({
  name: { type: String, require: true },
  country: { type: String },
  city: { type: String },
  imgUrl: { type: String },
  description: { type: String },
  ownerId: { type: String, require: true },
});

module.exports = model('Hotel', Hotel);
