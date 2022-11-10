const mongoose = require('mongoose');
const Router = require('express');
const HotelType = require('../../models/HotelType');
const Hotel = require('../../models/Hotel');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const hotelTypes = await HotelType.find().populate('image', 'path');

    return res.json(hotelTypes);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const hotelType = await HotelType.findOne({_id: req.params.id}).populate('image', 'path');
    if (!hotelType) {
      return res.status(404).json({message: 'hotel type not found'});
    }
    return res.json(hotelType);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }

    const hotelType = new HotelType({
      ...req.body,
      image: req.body.imageId,
    });

    return hotelType.save()
      .then(data => data.populate('image', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const hotelType = await HotelType.findOne({_id: req.params.id});
    if (!hotelType) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    const hotel = await Hotel.findOne({ hotelType: hotelType.id });
    if (hotel) {
      return res.status(400).json({message: 'Hotel type can\'t be deleted as there are hotel assigned'});
    }
    await hotelType.delete();
    return res.json({ message: 'Hotel type was successfully deleted' });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    
    const hotelType = await HotelType.findOne({ _id: req.params.id });
    if (!hotelType) {
      return res.status(404).json({message: 'Hotel type not found'});
    }
    await hotelType.update({
      ...req.body,
      image: req.body.imageId,
    });
    
    return HotelType.findOne({_id: req.params.id})
      .then(data => data.populate('image', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
