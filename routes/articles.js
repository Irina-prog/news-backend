const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { celebrate, Joi } = require('celebrate');
const {
  listArticles, deleteArticle, createArticle,
} = require('../controllers/articles');
const urlValidator = require('../lib/url-validator');

const router = new Router();

router.get('/articles', asyncHandler(listArticles));
router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(urlValidator).required(),
    image: Joi.string().custom(urlValidator).required(),
  }),
}), asyncHandler(createArticle));
router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), asyncHandler(deleteArticle));

module.exports = router;
