const Article = require('../models/article');

async function listArticles(req, res) {
  const cards = await Article.find({ owner: req.user._id }).sort({ date: -1 });
  res.send(cards);
}

async function deleteArticle(req, res) {
  await Article.deleteOne({ _id: req.params.id, owner: req.user._id }).orFail();
  res.send({});
}

async function createArticle(req, res) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const article = await Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  });
  res.send(article);
}

module.exports = {
  listArticles, deleteArticle, createArticle,
};
