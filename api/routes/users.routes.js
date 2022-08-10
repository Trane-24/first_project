const Router = require('express');
const User = require('../models/User');
const router = new Router();
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/fetchMe',
  authMiddleware,
  async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { _id, email, firstName, lastName, phone } = user;
    return res.json({ _id, email, firstName, lastName, phone });
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

    const { _id, email, firstName, lastName, phone } = user;
    return res.json({ _id, email, firstName, lastName, phone });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/', async (req, res) => {
  try {
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
    await User.findOneAndUpdate(
      {_id: req.params.id},
      {...req.body},
    );
    const response = await User.findOne({_id: req.params.id});
    return res.json(response);
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;