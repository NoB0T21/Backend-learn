const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


const uploadController = require('../controllers/upload.controller');

router.get('/',(req,res) => {
    res.render('start');
})
router.get('/home',authMiddleware, uploadController.showFile)
router.post('/upload',authMiddleware ,uploadController.uploadFile);

module.exports = router;