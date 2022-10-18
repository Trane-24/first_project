const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');
const Asset = require('../../models/Asset');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/search', async (req, res) => {
  try {
    const { limit, page } = req.query;
    const params = { ...req.query };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params).skip((page-1)*limit).limit(limit)
      .populate('images', 'path');

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/topHotels', async (req, res) => {
  try {
    const hotels = await Hotel.find().limit(4)
      .populate('images', 'path');

    return res.json({ data: hotels });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
