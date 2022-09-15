const { Schema, model, ObjectId } = require('mongoose');

const Hotel = new Schema({
  name: { type: String, require: true },
  country: { type: String },
  city: { type: String },
  images: [{ type: ObjectId, ref: 'Asset' }],
  description: { type: String },
  owner: { type: ObjectId, ref: 'User' },
});

module.exports = model('Hotel', Hotel);
