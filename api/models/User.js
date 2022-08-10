const { Schema, model } = require('mongoose');

const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phone: { type: String, require: true },
  role: { type: String, require: true },
});

module.exports = model('User', User);
