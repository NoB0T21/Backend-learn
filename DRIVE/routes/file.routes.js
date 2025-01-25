const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const fileController = require('../controllers/file.controller');

router.get('/:path',authMiddleware, fileController.downloadFile)

router.get('/delete/:path',authMiddleware, fileController.deleteFile)


module.exports = router;
