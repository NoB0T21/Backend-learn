const express = require('express');
const router = express.Router();
const{body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

const profileController = require('../controllers/profile.controller');
const postController = require('../controllers/posts.controller');

router.get('/profile', authMiddleware , profileController.showProfile);

router.post('/post', authMiddleware,
    body('content').isLength({min: 3}).withMessage('Must be 3 characters long'),
    postController.createPost);

router.get('/like/:id', authMiddleware , profileController.likePost)

module.exports = router;