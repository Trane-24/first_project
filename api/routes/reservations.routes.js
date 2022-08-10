const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find({...req.query});
    return res.json(reservations);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({_id: req.params.id});
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    return res.json(reservation);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { startDate, endDate, guestId, hotelId, notes } = req.body;
    if (!startDate) {
      return res.status(400).json({message: 'startDate is require'});
    }
    if (!endDate) {
      return res.status(400).json({message: 'endDate is require'});
    }
    if (!guestId) {
      return res.status(400).json({message: 'guestId is require'});
    }
    if (!hotelId) {
      return res.status(400).json({message: 'ownerId is require'});
    }
    const reservation = new Reservation(req.body);
    const response = await reservation.save();
    if (response) {
      const { _id, startDate, endDate, hotelId, guestId, notes } = response;
      const guest = await User.findOne({ _id: guestId });
      const hotel = await Hotel.findOne({ _id: hotelId });
      const { _id: id, name, ownerId, country, city, description, imgUrl } = hotel;
      const owner = await User.findOne({ _id: ownerId });

      return res.json({ _id, startDate, endDate, guest, notes, hotel: { _id: id, name, owner, country, city, description, imgUrl } });
    }
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({_id: req.params.id});
    if (!reservation) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    reservation.delete();
    return res.json(reservation);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({ _id: req.params.id });
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    const { startDate, endDate, guestId, hotelId, notes } = req.body;
    if (!startDate) {
      return res.status(400).json({message: 'startDate is require'});
    }
    if (!endDate) {
      return res.status(400).json({message: 'endDate is require'});
    }
    if (!guestId) {
      return res.status(400).json({message: 'guestId is require'});
    }
    if (!hotelId) {
      return res.status(400).json({message: 'ownerId is require'});
    }
    await reservation.update({...req.body})
    const response = await Reservation.findOne({ _id: req.params.id });
    if (response) {
      const { _id, startDate, endDate, hotelId, guestId, notes } = response;
      const guest = await User.findOne({ _id: guestId });
      const hotel = await Hotel.findOne({ _id: hotelId });
      const { _id: id, name, ownerId, country, city, description, imgUrl } = hotel;
      const owner = await User.findOne({ _id: ownerId });

      return res.json({ _id, startDate, endDate, guest, notes, hotel: { _id: id, name, owner, country, city, description, imgUrl } });
    }
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
