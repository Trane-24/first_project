const mongoose = require('mongoose');
const Router = require('express');
const HotelType = require('../../models/HotelType');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    return await HotelType.find().populate('image', 'path')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
