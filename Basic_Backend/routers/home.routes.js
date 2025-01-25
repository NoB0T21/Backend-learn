const express = require('express');
const router = express.Router();

const homeController = require('./routers/home.routes')

router.get('/home', (req, res) => {
    res.render('index')
})

router.post('/create', homeController.createPost)

module.exports = router;