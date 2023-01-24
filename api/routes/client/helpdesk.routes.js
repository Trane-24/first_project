const mongoose = require('mongoose');
const Router = require('express');
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

router.put('/messages/actions/markAsRead', authMiddleware, async (req, res) => {
  try {

  await Message.updateMany(
    {
      $and: [
        {clientId: req.user.id},
        {fromUser: { $ne: req.user.id }}
      ]
    },
    {
      $set: {
        read: true,
      },
    },
  )

  return res.json({ message: 'Messages has been mask as read' });
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
});

module.exports = router;
