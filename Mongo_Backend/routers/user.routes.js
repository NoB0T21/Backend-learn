const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.get('/create',(req, res) => {
    res.render('index')
})
router.post('/create',
    body('username').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('email').isEmail().withMessage('Must be EMail'),
    body('image').isURL().withMessage('Must be URL'),
    userController.createUser);

router.get('/edit/:id',userController.editUser);
router.post('/update/:id',
    body('username').isLength({min: 3}).withMessage('Must be 3 characters long'),
    body('email').isEmail().withMessage('Must be EMail'),
    body('image').isURL().withMessage('Must be URL'),
    userController.updateUser);

router.get('/delete/:id', userController.deleteUser);

module.exports = router;