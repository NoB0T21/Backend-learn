const express = require('express');
const router = express.Router();
const {body} = require('express-validator');

const homeController = require('../controllers/home.controller')

router.get('/home', homeController.showfile);

router.post('/create',
    body('filename').isLength({min: 3}).withMessage('Must be in 3 characters long'),
    body('content').isLength({min: 3}).withMessage('Must be in 3 characters long'), 
    homeController.createPost);

module.exports = router;