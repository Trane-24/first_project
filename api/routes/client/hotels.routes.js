const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/search', async (req, res) => {
  try {
    const { limit, page, search } = req.query;
    const regex = new RegExp(search, 'gi');
    const params = { verified: true, name: {'$regex': regex} };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params).skip((page-1)*limit).limit(limit)
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/topHotels', async (req, res) => {
  try {
    const params = { ...req.query, verified: true };
    const hotels = await Hotel.find(params).sort({ _id: -1 }).limit(4)
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

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
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });
    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }
    const hotel = await Hotel.findOne({ _id: req.params.id, owner: owner._id })
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json(hotel);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, hotelTypeId } = req.body;

    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });

    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }

    if (!hotelTypeId) {
      return res.status(400).json({message: 'hotelTypeId is require'});
    }

    const hotelType = await HotelType.findOne({ _id: hotelTypeId });

    if (!hotelType) {
      return res.status(404).json({message: 'Hotel type not found'});
    }


    const hotel = new Hotel({
      ...req.body,
      owner: owner._id,
      images: req.body.imagesIds,
      hotelType: req.body.hotelTypeId,
      verified: false,
    });

    return hotel.save()
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => data.populate('images', 'path'))
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
    const { name, hotelTypeId } = req.body;

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!hotelTypeId) {
      return res.status(400).json({message: 'hotelTypeId is require'});
    }

    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });

    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }

    const hotelType = await HotelType.findOne({ _id: hotelTypeId });

    if (!hotelType) {
      return res.status(404).json({message: 'Hotel type not found'});
    }
    
    const hotel = await Hotel.findOne({ _id: req.params.id });

    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    await hotel.update({
      ...req.body,
      images: req.body.imagesIds,
      hotelType: req.body.hotelTypeId,
      verified: false,
    });
    
    return Hotel.findOne({_id: req.params.id})
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => data.populate('images', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
