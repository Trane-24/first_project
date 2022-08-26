const mongoose = require('mongoose');
const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const { limit, page } = req.query;
    const total = await Hotel.find({...req.query}).count();
    const hotels = await Hotel.find({...req.query}).skip((page-1)*limit).limit(limit).populate('owner', 'email firstName lastName phone role');

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id}).populate('owner', 'email firstName lastName phone role');
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    return res.json(hotel);
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

    const hotel = new Hotel({
      ...req.body,
      owner: req.body.ownerId
    });
    const response = await (await hotel.save()).populate('owner', 'email firstName lastName phone role');
    return res.json(response);
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
    const reservation = await Reservation.findOne({ hotelId: hotel.id });
    if (reservation) {
      return res.status(400).json({message: 'Hotel can\'t be deleted as there are reservation assigned'});
    }
    await hotel.delete();
    return res.json({ message: 'Hotel was successfully deleted' });
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
    const response = await (await Hotel.findOne({_id: req.params.id})).populate('owner', 'email firstName lastName phone role');
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
