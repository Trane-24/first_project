const { Schema, model, ObjectId } = require('mongoose');

const Conversation = new Schema({
  client: { type: ObjectId, ref: 'User' },
  message: { type: String, require: true },
  read: { type: Boolean, require: true },
});

Conversation.set('timestamps', true);

module.exports = model('Conversation', Conversation);
