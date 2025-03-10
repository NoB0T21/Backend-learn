const express = require('express');
const router = express.Router();
const readController = require('../controllers/read.controller');

router.get('/', (req, res) => {
    res.render("home");
});

router.get('/read', readController.readUser);

module.exports = router;