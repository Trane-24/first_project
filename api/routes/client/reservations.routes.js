const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const guest = await User.findOne({ _id: req.user.id, role: 'guest' });
    if (!guest) {
      return res.status(403).json({message: 'No access'});
    }
    const { limit, page } = req.query;
    const params = {...req.query, guest: guest._id };
    const total = await Reservation.find(params).count();
    const reservations = await Reservation.find(params).skip((page-1)*limit).limit(limit)
      .populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName, lastName, role, phone, email' },
            { path: 'images' },
            { path: 'hotelType' },
          ]
        }
      )
      .populate('guest', 'firstName, lastName, role, phone, email')

    return res.json({ data: reservations, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { startDate, endDate, hotelId } = req.body;

    const guest = await User.findOne({ _id: req.user.id, role: 'guest' });

    if (!guest) {
      return res.status(403).json({message: 'No access'});
    }

    if (!startDate) {
      return res.status(400).json({message: 'startDate is require'});
    }
    if (!endDate) {
      return res.status(400).json({message: 'endDate is require'});
    }
    if (!hotelId) {
      return res.status(400).json({message: 'hotelId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({message: 'Unccorect hotelId'});
    }

    const hotel = await Hotel.findOne({ _id: hotelId });
  
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }

    const reservation = new Reservation({
      ...req.body,
      guest: guest._id,
      hotel: req.body.hotelId,
      status: 'pending',
    });

    return reservation.save()
      .then(data => data.populate(
        {
          path: 'hotel',
          populate: [
            { path: 'owner', select: 'firstName, lastName, role, phone, email' },
            { path: 'images' },
            { path: 'hotelType' },
          ]
        }
      ))
      .then(data => data.populate('guest', 'firstName, lastName, role, phone, email'))
      .then(data => res.json(data))
  
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
