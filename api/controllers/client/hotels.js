const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const HotelType = require('../../models/HotelType');
const Reservation = require('../../models/Reservation');

exports.search = async (req, res) => {
  try {
    const { limit, page, search, hotelType } = req.query;
    const regex = new RegExp(search, 'gi');
    const params = { verified: true, $or: [{ name: {'$regex': regex} }, { country: {'$regex': regex} }, { city: {'$regex': regex} }] };
    if (hotelType) params['hotelType'] = { $in: hotelType.split(',') };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params, '-owner').sort({ _id: -1 }).skip((page-1)*limit).limit(limit)
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.searchById = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id }, '-owner');

    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }

    return await Hotel.findOne({ _id: req.params.id }, '-owner')
      .then(data => data.populate('images', 'path'))
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.topHotels = async (req, res) => {
  try {
    const params = { ...req.query, verified: true };
    const hotels = await Hotel.find(params, '-owner').sort({ _id: -1 }).limit(4)
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json({ data: hotels });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.get = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });
    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }
    const params = { ...req.query, owner: owner._id };
    const total = await Hotel.find(params).count();
    const hotels = await Hotel.find(params, '-owner').skip((page-1)*limit).limit(limit)
      .populate('images', 'path')
      .populate({ path: 'hotelType', populate: { path: 'image' } })

    return res.json({ data: hotels, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.getOne = async (req, res) => {
  try {
    const owner = await User.findOne({ _id: req.user.id, role: 'owner' });
    if (!owner) {
      return res.status(403).json({message: 'No access'});
    }
    return await Hotel.findOne({ _id: req.params.id, owner: owner._id }, '-owner')
      .then(data => data.populate('images', 'path'))
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}

exports.post = async (req, res) => {
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

    await hotel.save()

    return Hotel.findOne({ _id: hotel._id }, '-owner')
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
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

exports.put = async (req, res) => {
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
    await Hotel.replaceOne(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
        owner: owner._id,
        images: req.body.imagesIds,
        hotelType: req.body.hotelTypeId,
        verified: false,
      }
    );
    
    return Hotel.findOne({_id: req.params.id}, '-owner')
      .then(data => data.populate({ path: 'hotelType', populate: { path: 'image' } }))
      .then(data => data.populate('images', 'path'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}
