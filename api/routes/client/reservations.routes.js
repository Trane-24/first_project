const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
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
      .populate({ path: 'hotel', populate: { path: 'owner' } })
      .populate({ path: 'hotel', populate: { path: 'images' } })
      .populate('guest')

    return res.json({ data: reservations, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
