const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const response = require('../utils/response');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, 8);

    const user = await User.findOne({ email: email });
    if (user) {
      response.badRequest(res, 'User already exists!');
      return;
    }

    const newUser = new User({ name: name, email: email, password: encryptedPass });
    await newUser.save();
    response.success(res, `Created user with email: ${newUser.email}`);
  } catch (ex) {
    response.serverError(res);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      response.notFound(res, 'User not found!');
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      response.badRequest(res, 'Wrong password!');
      return;
    }

    const payload = {
      user: { id: user._id },
    };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        response.serverError(res);
        return;
      }

      response.success(res, {
        token: token,
      });
    });
  } catch (ex) {
    response.serverError(res);
  }
};
