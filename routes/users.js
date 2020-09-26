const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { getUser } = require('../controllers/users');

const router = new Router();

router.get('/users/me', asyncHandler(getUser));

module.exports = router;
