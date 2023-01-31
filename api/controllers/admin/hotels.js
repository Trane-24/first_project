const mongoose = require('mongoose');
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const HotelType = require('../../models/HotelType');
const Reservation = require('../../models/Reservation');

exports.get = async (req, res) => {
  try {
    const { limit, page, search, ...nextParams } = req.query;
    const regex = new RegExp(search, 'gi');
    const params = { ...nextParams, name: { '$regex': regex } };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params).skip((page-1)*limit).limit(limit)
      .populate({ path: 'hotelType', populate: { path: 'image' } })
      .populate('owner', 'email firstName lastName phone role')
      .populate('images', 'path');

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.getOne = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({_id: req.params.id})
      .populate({ path: 'hotelType', populate: { path: 'image' } })
      .populate('owner', 'email firstName lastName phone role')
      .populate('images', 'path');
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    return res.json(hotel);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.post = async (req, res) => {
  try {
    const { name, ownerId, hotelTypeId } = req.body;

    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!ownerId) {
      return res.status(400).json({message: 'ownerId is require'});
    }

    if (!hotelTypeId) {
      return res.status(400).json({message: 'hotelTypeId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({message: 'Unccorect ownerId'});
    }

    const owner = await User.findOne({ _id: ownerId });
    const hotelType = await HotelType.findOne({ _id: hotelTypeId });

    if (!owner) {
      return res.status(404).json({message: 'Owner not found'});
    }
    if (!hotelType) {
      return res.status(404).json({message: 'Hotel type not found'});
    }

    const hotel = new Hotel({
      ...req.body,
      owner: req.body.ownerId,
      images: req.body.imagesIds,
      hotelType: req.body.hotelTypeId,
      verified: true,
    });

    await hotel.save();

    return await Hotel.findOne({ _id: hotel._id })
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => data.populate('images', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.put = async (req, res) => {
  try {
    const { name, ownerId, hotelTypeId } = req.body;
    if (!name) {
      return res.status(400).json({message: 'Name is require'});
    }
    if (!ownerId) {
      return res.status(400).json({message: 'ownerId is require'});
    }

    if (!hotelTypeId) {
      return res.status(400).json({message: 'hotelTypeId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({message: 'Unccorect ownerId'});
    }

    const owner = await User.findOne({ _id: ownerId });
    const hotelType = await HotelType.findOne({ _id: hotelTypeId });

    if (!owner) {
      return res.status(404).json({message: 'Owner not found'});
    }
    if (!hotelType) {
      return res.status(404).json({message: 'Hotel type not found'});
    }
    
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    await Hotel.replaceOne(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
        images: req.body.imagesIds,
        owner: req.body.ownerId,
        hotelType: req.body.hotelTypeId,
        verified: true,
      }
    );
    
    return await Hotel.findOne({_id: req.params.id})
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate('images', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.delete = async (req, res) => {
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
}

exports.markAsVerified = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }
    await hotel.update({
      ...req.body,
      verified: true,
    });
    
    return Hotel.findOne({_id: req.params.id})
      .then(data => data.populate('owner', 'email firstName lastName phone role'))
      .then(data => data.populate('images', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}
