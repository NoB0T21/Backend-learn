const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.get('/register',(req,res) => {
    res.render("index");
})
router.post('/register', 
    body('email').trim().isEmail().withMessage('Invalid Email'),
    body('name').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('password').trim().isLength({min: 3}).withMessage('Must be 3 characters long'),
    userController.registerUser)

router.get('/login',(req,res) => {
    res.render("login");
})
router.post('/login',
    body('name').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('password').trim().isLength({min: 3}).withMessage('invalid password'),
    userController.loginUser)

router.get('/logout',userController.logoutUser)

module.exports = router;