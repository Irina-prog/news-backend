const mongoose = require('mongoose');
require('mongoose-type-url');

const { ObjectId, Url } = mongoose.Schema.Types;

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: Url,
    required: true,
  },
  image: {
    type: Url,
    required: true,
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('article', articleSchema);
