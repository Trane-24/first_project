const mongoose = require('mongoose');
const Router = require('express');
const User = require('../../models/User');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/messages', authMiddleware, async (req, res) => {
  try {
    const { limit, page } = req.query;
    const params = { ...req.query, clientId: req.user.id };
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

router.post('/messages', authMiddleware, async (req, res) => {
  try {
    if (!req.body.message) {
      return res.status(400).json({message: 'message is require'});
    }

    const conversation = await Conversation.findOne({ clientId: req.user.id });

    if (!conversation) {
      const newConversation = new Conversation({
        client: req.user.id,
        read: false,
        message: req.body.message,
      })
      
      await newConversation.save();
    } else {
      await conversation.update({
        client: req.user.id,
        read: false,
        message: req.body.message,
      });
    }

    const message = new Message({
      message: req.body.message,
      read: false,
      fromUser: req.user.id,
      clientId: req.user.id,
    });

    return message.save()
      .then(data => data.populate('fromUser', 'firstName lastName'))
      .then(data => res.json(data)) 
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
