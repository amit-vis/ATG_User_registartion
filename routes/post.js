const express = require('express');
const router = express.Router();
const postController = require('../controller/post_controller');
const passport = require('passport');
const limitter = require('../config/limitter');

router.use(limitter)
router.post('/create',passport.authenticate('jwt', {session: false}), postController.createPost);
router.delete('/delete/:id',passport.authenticate('jwt', {session: false}), postController.deletePost);
router.put('/update/:id', passport.authenticate('jwt', {session: false}), postController.update);
router.get('/getpost', passport.authenticate('jwt', {session: false}), postController.myPost);


module.exports = router;