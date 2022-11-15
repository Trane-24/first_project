const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit, page } = req.query;
    const params = {...req.query};
    const total = await Reservation.find(params).count();
    const reservations = await Reservation.find(params).skip((page-1)*limit).limit(limit)
      .populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName lastName phone role email' },
            { path: 'hotelType' },
            { path: 'images' }
          ]
        }
      )
      .populate('guest', 'firstName lastName phone role email')

    return res.json({ data: reservations, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({_id: req.params.id})
      .populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName lastName phone role email' },
            { path: 'hotelType' },
            { path: 'images' }
          ]
        }
      )
      .populate('guest', 'firstName lastName phone role email')

    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }

    return res.json(reservation);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, guestId, hotelId } = req.body;

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
      return res.status(400).json({message: 'hotelId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({message: 'Unccorect guestId'});
    }
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({message: 'Unccorect hotelId'});
    }

    const guest = await User.findOne({ _id: guestId });
    const hotel = await Hotel.findOne({ _id: hotelId });
  
    if (!guest) {
      return res.status(404).json({message: 'Guest not found'});
    }
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }

    const reservation = new Reservation({
      ...req.body,
      guest: req.body.guestId,
      hotel: req.body.hotelId,
      status: 'pending',
    });

    await reservation.save()

    return await Reservation.findOne({ _id: reservation._id })
      .then(data => data.populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName lastName phone role email' },
            { path: 'hotelType' },
            { path: 'images' }
          ]
        }
      ))
      .then(data => data.populate('guest', 'firstName lastName phone role email'))
      .then(data => res.json(data))
  
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const reservation = await Reservation.findOne({_id: req.params.id});
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    await reservation.delete();
    return res.json({ message: 'Reservation was successfully deleted' });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, guestId, hotelId } = req.body;

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
      return res.status(400).json({message: 'hotelId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({message: 'Unccorect guestId'});
    }
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({message: 'Unccorect hotelId'});
    }

    const reservation = await Reservation.findOne({ _id: req.params.id });
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }

    await Reservation.replaceOne(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
        hotel: req.body.hotelId,
        guest: req.body.guestId,
      }
    );

    return await Reservation.findOne({_id: req.params.id})
      .then(data => data.populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName lastName phone role email' },
            { path: 'hotelType' },
            { path: 'images' }
          ]
        }
      ))
      .then(data => data.populate('guest', 'firstName lastName phone role email'))
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
