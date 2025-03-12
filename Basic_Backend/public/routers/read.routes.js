const express = require('express');
const router = express.Router();
const readController = require('../controllers/read.controller');

router.get('/:_id', readController.read);

module.exports = router;