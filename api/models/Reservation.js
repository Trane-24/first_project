const { Schema, model, ObjectId } = require('mongoose');

const Reservation = new Schema({
  hotel: { type: ObjectId, ref: 'Hotel' },
  guest: { type: ObjectId, ref: 'User' },
  startDate: { type: String, require: true },
  endDate: { type: String, require: true },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'rejected', 'completed'], default: 'pending' },
  includeIntoCheckInCalendar: { type: Boolean, default: true },
});

module.exports = model('Reservation', Reservation);
