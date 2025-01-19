const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload.controller');

router.get('/home', (req, res) => {
    res.render("home")
})
router.post('/upload', uploadController.uploadFile)

module.exports = router;