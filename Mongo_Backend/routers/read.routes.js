const express = require('express');
const router = express.Router();
const readController = require('../controllers/read.controller');

router.get('/read', readController.readUser);

module.exports = router;