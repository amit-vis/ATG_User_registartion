const express = require('express');
const router = express.Router();
const homeController = require('../controller/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/token', require('./token'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/like', require('./like'));

module.exports = router;