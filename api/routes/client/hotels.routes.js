const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
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
    const params = { ...req.query, _id: -1 };
    const hotels = await Hotel.find(params).limit(4)
      .populate('images', 'path');

    return res.json({ data: hotels });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit, page } = req.query;
    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });
    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }
    const params = { ...req.query, owner: owner._id };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params).skip((page-1)*limit).limit(limit)
      .populate('images', 'path');

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
