const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const asyncHandler = require('express-async-handler');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const rateLimit = require('express-rate-limit');

require('dotenv').config();

const articles = require('./routes/articles');
const users = require('./routes/users');
const {
  createUser, login, logout,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler, notFoundHandler } = require('./lib/error-handler');
const rateLimitConfig = require('./rate-limit.js');

const { PORT = 3000, DATABASE_URL = 'mongodb://localhost/news' } = process.env;

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();
app.set('trust proxy', 1); // Приложение будет спрятано за NGINX
app
  .use(helmet())
  .use(rateLimit(rateLimitConfig))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(requestLogger)
  .post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      password: Joi.string().required().min(Number(process.env.MIN_PASSWORD_LENGTH || 6)),
      email: Joi.string().email().required(),
    }),
  }),
  asyncHandler(createUser))
  .post('/signin', celebrate({
    body: Joi.object().keys({
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    }),
  }), asyncHandler(login))
  .post('/signout', celebrate({
    body: Joi.any(),
  }), asyncHandler(logout))
  .use('/', auth, articles, users) // защищаем авторизацией все API-вызовы (кроме /signin и /signup)
  .use(errorLogger)
  .use(errorHandler)
  .use((req, res) => {
    notFoundHandler(res);
  });
app.listen(PORT, () => {
  console.log(`Started on the port ${PORT}`); // eslint-disable-line no-console
});
