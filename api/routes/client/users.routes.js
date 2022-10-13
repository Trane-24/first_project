const Router = require('express');
const User = require('../../models/User');
const router = new Router();
const authMiddleware = require('../../middlewares/auth.middleware');

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

module.exports = router;
