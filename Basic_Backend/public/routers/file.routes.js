const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const fileController = require('../controllers/file.controller');

router.get('/:_id', fileController.editFile);
router.post('/edit/:_id',
    body('filename').isLength({min: 3}).withMessage('Must be in 3 characters long'),
    body('content').isLength({min: 3}).withMessage('Must be in 3 characters long'),
    fileController.updateFile);

module.exports = router;