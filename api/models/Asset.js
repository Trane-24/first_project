const { Schema, model } = require('mongoose');

const Asset = new Schema({
  path: { type: String, require: true },
});

module.exports = model('Asset', Asset);
