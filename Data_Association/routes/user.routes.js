const express = require('express');
const router = express.Router();
const{body} = require('express-validator');

const userController = require('../controllers/user.controller')

router.get('/register',(req,res) => {
    res.render('index');
});
router.post('/register',
    body('name').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('username').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('email').isEmail().withMessage('Must be email'),
    body('password').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('age').isInt({min: 1, max: 100}).withMessage('Must be between 1-100'),
    userController.createUser
);

router.get('/login',(req,res) => {
    res.render('login');
});
router.post('/login',
    body('username').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('password').isLength({min: 3}).withMessage('Must be 3 characters long'),
    userController.loginUser
);

router.get('/logout', userController.logout)

module.exports = router;