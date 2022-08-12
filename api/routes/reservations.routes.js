const mongoose = require('mongoose');
const Router = require('express');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Reservation = require('../models/Reservation');
const router = new Router();

router.get('/', async (req, res) => {
  try {
    const { limit, page } = req.query;
    const reservations = await Reservation.find({...req.query}).skip((page-1)*limit).limit(limit);
    const total = await Reservation.find({...req.query}).count();
    const newReservations = reservations.map((reservation) => {
      const data = {};
      Object.keys(reservation._doc).map(key => {
        if (reservation._doc[key]) {
          data[key] = reservation._doc[key];
        }
      })
      return data;
    })
    const reservationsPromises = newReservations.map(async(reservation) => {
      const guest = await User.findOne({ _id: reservation.guestId });
      const guestData = {};
      Object.keys(guest._doc).map(key => {
        if (guest._doc[key] && key !== 'password') {
          guestData[key] = guest._doc[key];
        }
      })
      const hotel = await Hotel.findOne({ _id: reservation.hotelId });
      const owner = await User.findOne({ _id: hotel.ownerId });
      const ownerData = {};
      Object.keys(owner._doc).map(async (key) => {
        if (owner._doc[key] && key !== 'password') {
          ownerData[key] = owner._doc[key];
        }
      })
      const hotelData = {};
      Object.keys(hotel._doc).map(async (key) => {
        if (hotel._doc[key]) {
          if (key === 'ownerId') {
            hotelData['owner'] = ownerData;
          } else {
            hotelData[key] = hotel._doc[key];
          }
        }
      })
      const { guestId, hotelId, ...nextData } = reservation;
      return { ...nextData, guest: guestData, hotel: hotelData }
    });

    Promise.all(reservationsPromises).then( function (reservations){
      return res.json({ data: reservations, total });
    });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({_id: req.params.id});
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    const guest = await User.findOne({ _id: reservation.guestId });
    const hotel = await Hotel.findOne({ _id: reservation.hotelId });
    const owner = await User.findOne({ _id: hotel.ownerId });
    const data = {};
    Object.keys(reservation._doc).map(key => {
      if (reservation._doc[key]) {
        if (key === 'guestId') {
          const guestData = {};
          Object.keys(guest._doc).map(key => {
            if (guest._doc[key] && key !== 'password') {
              guestData[key] = guest._doc[key];
            }
          })
          data['guest'] = guestData;
        } else if (key === 'hotelId') {
          const hotelData = {};
          Object.keys(hotel._doc).map(key => {
            if (hotel._doc[key]) {
              if (key === 'ownerId') {
                const ownerData = {};
                Object.keys(owner._doc).map(key => {
                  if (owner._doc[key] && key !== 'password') {
                    ownerData[key] = owner._doc[key];
                  }
                })
                hotelData['owner'] = ownerData;
              } else {
                hotelData[key] = hotel._doc[key];
              }
            }
          })
          data['hotel'] = hotelData;
        } else {
          data[key] = reservation._doc[key];
        }
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
    const { startDate, endDate, guestId, hotelId } = req.body;

    if (!startDate) {
      return res.status(400).json({message: 'startDate is require'});
    }
    if (!endDate) {
      return res.status(400).json({message: 'endDate is require'});
    }
    if (!guestId) {
      return res.status(400).json({message: 'guestId is require'});
    }
    if (!hotelId) {
      return res.status(400).json({message: 'hotelId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({message: 'Unccorect guestId'});
    }
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({message: 'Unccorect hotelId'});
    }

    const guest = await User.findOne({ _id: guestId });
    const hotel = await Hotel.findOne({ _id: hotelId });
    const owner = await User.findOne({ _id: hotel.ownerId });
  
    if (!guest) {
      return res.status(404).json({message: 'Guest not found'});
    }
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }

    const reservation = new Reservation(req.body);
    const response = await reservation.save();
    const data = {};

    Object.keys(response._doc).map(key => {
      if (response._doc[key]) {
        if (key === 'guestId') {
          const guestData = {};
          Object.keys(guest._doc).map(key => {
            if (guest._doc[key] && key !== 'password') {
              guestData[key] = guest._doc[key];
            }
          })
          data['guest'] = guestData;
        } else if (key === 'hotelId') {
          const hotelData = {};
          Object.keys(hotel._doc).map(key => {
            if (hotel._doc[key]) {
              if (key === 'ownerId') {
                const ownerData = {};
                Object.keys(owner._doc).map(key => {
                  if (owner._doc[key] && key !== 'password') {
                    ownerData[key] = owner._doc[key];
                  }
                })
                hotelData['owner'] = ownerData;
              } else {
                hotelData[key] = hotel._doc[key];
              }
            }
          })
          data['hotel'] = hotelData;
        } else {
          data[key] = response._doc[key];
        }
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
    const reservation = await Reservation.findOne({_id: req.params.id});
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    await reservation.delete();
    return res.json({ message: 'Reservation was successfully deleted' });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { startDate, endDate, guestId, hotelId } = req.body;

    if (!startDate) {
      return res.status(400).json({message: 'startDate is require'});
    }
    if (!endDate) {
      return res.status(400).json({message: 'endDate is require'});
    }
    if (!guestId) {
      return res.status(400).json({message: 'guestId is require'});
    }
    if (!hotelId) {
      return res.status(400).json({message: 'hotelId is require'});
    }

    if (!mongoose.Types.ObjectId.isValid(guestId)) {
      return res.status(400).json({message: 'Unccorect guestId'});
    }
    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({message: 'Unccorect hotelId'});
    }

    const reservation = await Reservation.findOne({ _id: req.params.id });
    if (!reservation) {
      return res.status(404).json({message: 'Reservation not found'});
    }
    await reservation.update({...req.body});
    const response = await Reservation.findOne({_id: req.params.id});

    const guest = await User.findOne({ _id: guestId });
    const hotel = await Hotel.findOne({ _id: hotelId });
    const owner = await User.findOne({ _id: hotel.ownerId });
  
    if (!guest) {
      return res.status(404).json({message: 'Guest not found'});
    }
    if (!hotel) {
      return res.status(404).json({message: 'Hotel not found'});
    }

    const data = {};

    Object.keys(response._doc).map(key => {
      if (response._doc[key]) {
        if (key === 'guestId') {
          const guestData = {};
          Object.keys(guest._doc).map(key => {
            if (guest._doc[key] && key !== 'password') {
              guestData[key] = guest._doc[key];
            }
          })
          data['guest'] = guestData;
        } else if (key === 'hotelId') {
          const hotelData = {};
          Object.keys(hotel._doc).map(key => {
            if (hotel._doc[key]) {
              if (key === 'ownerId') {
                const ownerData = {};
                Object.keys(owner._doc).map(key => {
                  if (owner._doc[key] && key !== 'password') {
                    ownerData[key] = owner._doc[key];
                  }
                })
                hotelData['owner'] = ownerData;
              } else {
                hotelData[key] = hotel._doc[key];
              }
            }
          })
          data['hotel'] = hotelData;
        } else {
          data[key] = response._doc[key];
        }
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
