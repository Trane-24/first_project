const User = require('../../models/User');
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if(user.role !== 'admin') {
      return res.status(403).json({message: 'No access'});
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if(!isPassValid) {
      return res.status(400).json({message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "7d"});
    return res.json(token)
  } catch (e) {
    console.log(e);
    res.send({message: 'Server error'});
  }
}
