const mongoose = require('mongoose');
const Router = require('express');
const Conversation = require('../../models/Conversation');
const Message = require('../../models/Message');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const limit = req.query.limit ? +req.query.limit : 20;
    const skip = ((page-1) * limit);

    const regex = new RegExp(req.query.search, 'gi');

    return Conversation.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "client",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $unwind: {
          path: "$client",
        },
      },
      {
        $match: {
          $or: [
            {"client.firstName": {'$regex': regex}},
            {"client.lastName": {'$regex': regex}},
          ]
          
        },
      },
      {
        $sort: {
          updatedAt: -1
        }
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [
            {
              $count: 'total'
            }
          ]
        }
      },
    ])
    .then((data) => ({ ...data[0], total: data[0].total[0]?.total || 0 }))
    .then((data) => res.json(data))
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

router.put('/messages/:id/actions/markAsRead', authMiddleware, async (req, res) => {
  try {

  await Conversation.findOneAndUpdate(
    {
      client: req.params.id,
    },
    {
      $set: {
        read: true,
      },
    }
  )
  await Message.updateMany(
    {
      $and: [
        {clientId: req.params.id},
        {fromUser: req.params.id }
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
