const Router = require('express');
const bcrypt = require('bcryptjs')
const User = require('../../models/User');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');
const { check, validationResult } = require('express-validator');

router.get('/me',
  authMiddleware,
  async (req, res) => {
  try {
    return await User.findOne({ _id: req.user.id }, 'firstName lastName email phone role')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/me',
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

    const user = await User.findOne({ _id: req.user.id });
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
        _id: req.user.id,
      },
      {
        ...req.body,
        password: req.body.password ? await bcrypt.hash(req.body.password, 8) : user.password
      }
    );

    return await User.findOne({_id: req.user.id}, 'firstName lastName email phone role')
      .then(data => res.json(data))
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
