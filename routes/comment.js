const express = require('express');
const router = express.Router();
const commentController = require('../controller/comment_controller');
const passport = require('passport');
const limitter = require('../config/limitter');

router.use(limitter)

router.post('/create',passport.authenticate('jwt', {session: false}), commentController.create);
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), commentController.removeComment);
router.get('/get',passport.authenticate('jwt', {session: false}), commentController.getComment);

module.exports = router;