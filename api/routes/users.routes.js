const Router = require('express');
const User = require('../models/User');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/fetchMe',
  authMiddleware,
  async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id, email, firstName, lastName, phone, role } = user;
    return res.json({ _id, email, firstName, lastName, phone, role });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({...req.query});
    return res.json(users);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const { _id, email, firstName, lastName, phone, role } = user;
    return res.json({ _id, email, firstName, lastName, phone, role });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, role } = req.body;
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
    const response = await user.save();
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    user.delete();
    return res.json(user);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const { firstName, lastName, phone, email, role } = req.body;
  
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

    await user.update({...req.body});
    const response = await User.findOne({_id: req.params.id});
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
