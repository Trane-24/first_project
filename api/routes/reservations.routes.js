const mongoose = require('mongoose');
const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const { limit, page } = req.query;
    const reservations = await Reservation.find({...req.query}).skip((page-1)*limit).limit(limit);
    const total = await Reservation.find({...req.query}).count();
    const newReservations = reservations.map((reservation) => {
      const data = {};
      Object.keys(reservation._doc).map(key => {
        if (reservation._doc[key]) {
          data[key] = reservation._doc[key];
        }
      })
      return data;
    })
    const reservationsPromises = newReservations.map(async(reservation) => {
      const guest = await User.findOne({ _id: reservation.guestId });
      const guestData = {};
      Object.keys(guest._doc).map(key => {
        if (guest._doc[key] && key !== 'password') {
          guestData[key] = guest._doc[key];
        }
      })
      const hotel = await Hotel.findOne({ _id: reservation.hotelId });
      const owner = await User.findOne({ _id: hotel.ownerId });
      const hotelData = {};
      Object.keys(hotel._doc).map(async (key) => {
        if (hotel._doc[key]) {
          if (key === 'ownerId') {
            hotelData['owner'] = owner;
          } else {
            hotelData[key] = hotel._doc[key];
          }
        }
      })
      const { guestId, hotelId, ...nextData } = reservation;
      return { ...nextData, guest: guestData, hotel: hotelData }
    });

    Promise.all(reservationsPromises).then( function (reservations){
      return res.json({ data: reservations, total });
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
