const Router = require('express');
const User = require('../models/User');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/fetchMe',
  authMiddleware,
  async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const data = {};
    Object.keys(user._doc).map(key => {
      if (user._doc[key] && key !== 'password') {
        data[key] = user._doc[key];
      }
    })
    return res.json(data);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({...req.query});
    const newUsers = users.map((user) => {
      const data = {};
      Object.keys(user._doc).map(key => {
        if (user._doc[key] && key !== 'password') {
          data[key] = user._doc[key];
        }
      })
      return data;
    })
    return res.json(newUsers);
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
    const data = {};
    Object.keys(user._doc).map(key => {
      if (user._doc[key] && key !== 'password') {
        data[key] = user._doc[key];
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
    const response = await user.save();
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

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
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

router.put('/:id', async (req, res) => {
  try {
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

    await user.update({...req.body});
    const response = await User.findOne({_id: req.params.id});
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

module.exports = router;
