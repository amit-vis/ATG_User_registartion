const express = require('express');
const router = express.Router();
const passport = require('passport');
const likesController = require('../controller/like_controller');

router.post('/:type/:id', passport.authenticate('jwt', {session: false}), likesController.toggleLike)


module.exports = router;