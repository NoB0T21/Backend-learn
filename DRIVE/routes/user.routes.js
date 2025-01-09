const express = require('express');
const router = express.Router();
const {validationResult, body} = require('express-validator')

router.get('/register',(req,res) => {
    res.render("index");
})
router.post('/register', 
    body('email').trim().isEmail(),
    body('name').isLength({min: 3}),
    body('password').trim().isLength({min: 3}),
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            })
        }
        res.send(errors)
    })

module.exports = router;