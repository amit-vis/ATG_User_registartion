const express = require('express');
const router = express.Router();
const tokenController = require('../controller/reset_password_controller');
const limitter = require('../config/limitter');

router.use(limitter)
router.post('/create/:id', tokenController.create);
router.post('/update', tokenController.updatePassword)

module.exports = router;