const mongoose = require('mongoose');
const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({...req.query});
    const newHotels = hotels.map((hotel) => {
      const data = {};
      Object.keys(hotel._doc).map(key => {
        if (hotel._doc[key]) {
          data[key] = hotel._doc[key];
        }
      })
      return data;
    })
    return res.json(newHotels);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id});
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    const data = {};
    Object.keys(hotel._doc).map(key => {
      if (hotel._doc[key]) {
        data[key] = hotel._doc[key];
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, ownerId } = req.body;

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!ownerId) {
      return res.status(400).json({message: 'ownerId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({message: 'Unccorect ownerId'});
    }

    const owner = await User.findOne({ _id: ownerId });
    if (!owner) {
      return res.status(404).json({message: 'Owner not found'});
    }

    const hotel = new Hotel(req.body);
    const response = await hotel.save();
    const data = {};
    Object.keys(response._doc).map(key => {
      if (response._doc[key] && key !== 'password') {
        data[key] = response._doc[key];
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id});
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    const response = await hotel.delete();
    const data = {};
    Object.keys(response._doc).map(key => {
      if (response._doc[key] && key !== 'password') {
        data[key] = response._doc[key];
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, ownerId } = req.body;
    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!ownerId) {
      return res.status(400).json({message: 'ownerId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({message: 'Unccorect ownerId'});
    }

    const owner = await User.findOne({ _id: ownerId });
    if (!owner) {
      return res.status(404).json({message: 'Owner not found'});
    }
    
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    await hotel.update({...req.body});
    const response = await Hotel.findOne({_id: req.params.id});
    const data = {};
    Object.keys(response._doc).map(key => {
      if (response._doc[key] && key !== 'password') {
        data[key] = response._doc[key];
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
