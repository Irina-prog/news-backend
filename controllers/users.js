const jwt = require('jsonwebtoken');
const User = require('../models/user');
const HttpError = require('../lib/http-error');
const jwtSecret = require('../lib/jwt-secret');

async function getUser(req, res) {
  const user = await User.findById(req.user._id).orFail();
  res.send(user);
}

async function createUser(req, res) {
  try {
    const { password, email, name } = req.body;
    const user = new User({ email, name });
    await user.setPassword(password);
    await user.save();
    res.send(user);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new HttpError(409, 'Такой пользователь уже зарегистрирован');
    }

    throw err;
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password').orFail();
    const matched = await user.comparePasswords(req.body.password);
    if (!matched) {
      throw new Error();
    }
    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.cookie('token', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
    res.send({});
  } catch {
    throw new HttpError(401, 'Логин и/или пароль не верны');
  }
}

async function logout(req, res) {
  res.cookie('token', '', { maxAge: 0 });
  res.send({});
}

module.exports = {
  getUser, createUser, login, logout,
};
