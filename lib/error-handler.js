const mongoose = require('mongoose');
const { CelebrateError } = require('celebrate');

const HttpError = require('./http-error');

const notFoundHandler = (res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });

module.exports.errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof HttpError) {
    res.status(err.status || 500).send({ message: err.message });
    return;
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    notFoundHandler(res);
    return;
  }

  // Обрабатывыем ошибки валидации при использовании celebrate и mongoose
  if (err instanceof mongoose.Error.ValidationError || err instanceof CelebrateError) {
    const { details = [] } = err;
    res.status(400).send({ message: 'Введены недопустимые данные', details: [...details] });
    return;
  }

  res.status(500).send({ message: 'Произошла ошибка на сервере' }); // Пользователем незачем знать детали об необработанной ошибке
};

module.exports.notFoundHandler = notFoundHandler;
