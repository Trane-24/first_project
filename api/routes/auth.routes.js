const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = new Router();

router.post('/registration',
  [
    check('email', 'Uncorrecct email').isEmail(),
    check('password', 'Password must be longer than 8 symbol').isLength({min:8}),
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({message: 'Uncorrect request', errors})
    }
    const { email, password, ...nextData } = req.body;
    const candidate = await User.findOne({email});

    if(candidate) {
      return res.status(400).json({message: `User with email ${email} already exist`});
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const user = new User({email, password: hashPassword, ...nextData });
    await user.save();
    return res.json({message: 'User was created'});
  } catch (e) {
    console.log(e);
    res.send({message: 'Serveer error'});
  }
});

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if(!isPassValid) {
      return res.status(400).json({message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"});
    return res.json(token)
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
