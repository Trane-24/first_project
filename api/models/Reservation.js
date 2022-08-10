const { Schema, model } = require('mongoose');

const Reservation = new Schema({
  hotelId: { type: String, require: true },
  guestId: { type: String, require: true },
  startDate: { type: String, require: true },
  endDate: { type: String, require: true },
  notes: { type: String }
});

module.exports = model('Reservation', Reservation);
