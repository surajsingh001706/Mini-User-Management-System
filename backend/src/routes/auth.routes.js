const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/auth.controller');
const { validateSignup, validateLogin, validate } = require('../utils/validators');

router.post('/signup', validateSignup, validate, signup);
router.post('/login', validateLogin, validate, login);
router.get('/logout', logout);

module.exports = router;
