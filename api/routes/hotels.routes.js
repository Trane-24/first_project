const mongoose = require('mongoose');
const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const Asset = require('../models/Asset');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit, page } = req.query;
    const params = { ...req.query };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params).skip((page-1)*limit).limit(limit)
      .populate('owner', 'email firstName lastName phone role').populate('img', 'path');

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id}).populate('owner', 'email firstName lastName phone role').populate('img', 'path');
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    return res.json(hotel);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, ownerId, imgId } = req.body;

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!ownerId) {
      return res.status(400).json({message: 'ownerId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({message: 'Unccorect ownerId'});
    }
    if (!mongoose.Types.ObjectId.isValid(imgId)) {
      return res.status(400).json({message: 'Unccorect imgId'});
    }

    const owner = await User.findOne({ _id: ownerId });
    const img = await Asset.findOne({ _id: imgId });

    if (!owner) {
      return res.status(404).json({message: 'Owner not found'});
    }
    if (!img) {
      return res.status(404).json({message: 'Image not found'});
    }

    const hotel = new Hotel({
      ...req.body,
      owner: req.body.ownerId,
      img: req.body.imgId
    });

    return hotel.save()
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate('img', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id});
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    const reservation = await Reservation.findOne({ hotel: hotel.id });
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

router.put('/:id', authMiddleware, async (req, res) => {
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
    
    return Hotel.findOne({_id: req.params.id})
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate('img', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
