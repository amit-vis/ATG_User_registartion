const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/token', require('./token'))

module.exports = router;