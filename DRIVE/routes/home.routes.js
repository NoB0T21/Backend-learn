const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


const uploadController = require('../controllers/upload.controller');

router.get('/home',authMiddleware, (req, res) => {
    res.render("home")
})
router.post('/upload',authMiddleware ,uploadController.uploadFile)

module.exports = router;