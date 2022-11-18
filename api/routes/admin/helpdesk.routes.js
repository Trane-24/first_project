const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const { limit, page, search, ...nextParams } = req.query;
    const regex = new RegExp(search, 'gi');
    const params = { ...nextParams };
    const total = await Conversation.find(params).count();
    const conversations = await Conversation.find(params).skip((page-1)*limit).limit(limit).populate('client');

    return res.json({ data: conversations, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.get('/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { limit, page } = req.query;
    const params = { ...req.query, clientId: req.params.id };
    const total = await Message.find(params).count();
    const messages = await Message.find(params).sort({ _id: -1 }).skip((page-1)*limit).limit(limit)
      .populate('fromUser', 'firstName lastName')
      .populate('toUser', 'firstName lastName');

    return res.json({ data: messages, total });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

router.post('/messages/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({message: 'message is require'});
    }

    const client = await User.findOne({ _id: req.params.id });

    if (!client) {
      return res.status(404).json({message: 'Client not found'});
    }

    const conversation = await Conversation.findOne({ clientId: req.params.id });

    if (!conversation) {
      const newConversation = new Conversation({
        client: req.params.id,
        read: false,
        message: req.body.message,
      })
      
      await newConversation.save();
    } else {
      await conversation.update({
        client: req.params.id,
        read: false,
        message: req.body.message,
      });
    }

    const message = new Message({
      message: req.body.message,
      read: false,
      fromUser: req.user.id,
      toUser: req.params.id,
      clientId: req.params.id,
    });

    return message.save()
      .then(data => data.populate('fromUser', 'firstName lastName'))
      .then(data => data.populate('toUser', 'firstName lastName'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
