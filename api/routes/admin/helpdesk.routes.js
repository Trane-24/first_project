const mongoose = require('mongoose');
const Router = require('express');
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

module.exports = router;
