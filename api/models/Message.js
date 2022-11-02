const { Schema, model, ObjectId } = require('mongoose');

const Message = new Schema({
  fromUser: { type: ObjectId, ref: 'User' },
  toUser: { type: ObjectId, ref: 'User' },
  clientId: { type: ObjectId, ref: 'User' },
  message: { type: String, require: true },
  read: { type: Boolean, require: true },
});

module.exports = model('Message', Message);
