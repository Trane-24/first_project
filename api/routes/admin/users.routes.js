const Router = require('express');
const bcrypt = require('bcryptjs')
const User = require('../../models/User');
const Hotel = require('../../models/Hotel');
const Reservation = require('../../models/Reservation');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const { check, validationResult } = require('express-validator');

router.get('/fetchMe',
  authMiddleware,
  async (req, res) => {
  try {
    return await User.findOne({ _id: req.user.id }, 'firstName lastName phone role email')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit, page, search } = req.query;
    const regex = new RegExp(search, 'gi');
    const params = { ...req.query, $or: [ {firstName:{'$regex': regex}}, {lastName:{'$regex': regex}} ] };
    const users = await User.find(params, 'firstName lastName phone role email').skip((page-1)*limit).limit(limit);
    const total = await User.find(params).count();
    return res.json({ data: users, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id}, 'firstName lastName phone role email');
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/',
  authMiddleware,
  [
    check('email', 'Uncorrecct email').isEmail(),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: 'E-mail is not valid', errors})
    }

    const { firstName, lastName, email, role } = req.body;
    if (!firstName) {
      return res.status(400).json({message: 'firstName is require'});
    }
    if (!lastName) {
      return res.status(400).json({message: 'lastName is require'});
    }
    if (!email) {
      return res.status(400).json({message: 'email is require'});
    }
    if (!role) {
      return res.status(400).json({message: 'role is require'});
    }

    const candidate = await User.findOne({email});

    if (candidate) {
      return res.status(400).json({message: `User with email ${email} already exist`});
    }

    const user = new User(req.body);
    await user.save()

    return await User.findOne({_id: user._id}, 'firstName lastName phone role email')
      .then(data => res.json(data))

  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    const reservation = await Reservation.findOne({ guest: user.id });
    if (reservation) {
      return res.status(400).json({message: 'User can\'t be deleted as there are reservation assigned'});
    }
    const hotel = await Hotel.findOne({ owner: user.id });
    if (hotel) {
      return res.status(400).json({message: 'User can\'t be deleted as there are hotel assigned'});
    }
    const response = await user.delete();
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

router.put('/:id',
  authMiddleware,
  [
    check('email', 'Uncorrecct email').isEmail(),
    check('password', 'Password must be longer than 8 symbol').isLength({min:8}),
  ],
  async (req, res) => {
  try {
    if (req.body.password) {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return res.status(400).json({message: 'Uncorrect request', errors})
      }
    }

    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const { firstName, lastName, email, role } = req.body;
  
    if (!firstName) {
      return res.status(400).json({message: 'firstName is require'});
    }
    if (!lastName) {
      return res.status(400).json({message: 'lastName is require'});
    }
    if (!email) {
      return res.status(400).json({message: 'email is require'});
    }
    if (!role) {
      return res.status(400).json({message: 'role is require'});
    }

    if (email !== user.email) {
      const candidate = await User.findOne({email});

      if (candidate) {
        return res.status(400).json({message: `User with email ${email} already exist`});
      }
    }

    await User.replaceOne(
      {
        _id: req.params.id
      },
      {
        ...req.body,
        password: req.body.password ? await bcrypt.hash(req.body.password, 8) : user.password
      }
    );

    return await User.findOne({_id: req.params.id}, 'firstName lastName phone role email')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
