const { Schema, model, ObjectId } = require('mongoose');

const Conversation = new Schema({
  client: { type: ObjectId, ref: 'User' },
  message: { type: String, require: true },
  read: { type: Boolean, require: true },
});

module.exports = model('Conversation', Conversation);
