const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({...req.query});
    return res.json(hotels);
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
    return res.json(hotel);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    const response = await hotel.save();
    const { _id, name, country, city, ownerId } = response;
    const owner = await User.findOne({ _id: ownerId });
    const { _id: _ownerId, email, firstName, lastName, phone, role } = owner;
    return res.json({ _id, name, country, city, owner: { _ownerId, email, firstName, lastName, phone, role } });
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
    hotel.delete();
    return res.json(hotel);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Hotel.findOneAndUpdate(
      {_id: req.params.id},
      {...req.body},
    );
    const response = await Hotel.findOne({_id: req.params.id});
    const { _id, name, country, city, ownerId } = response;
    const owner = await User.findOne({ _id: ownerId });
    const { _id: _ownerId, email, firstName, lastName, phone, role } = owner;
    return res.json({ _id, name, country, city, owner: { _ownerId, email, firstName, lastName, phone, role } });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
