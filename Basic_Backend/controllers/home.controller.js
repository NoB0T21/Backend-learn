const {validationResult} = require('express-validator');
const homeServices = require('../services/home.service');

module.exports.createPost = async (req, res) => {
    try {
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({
                errors: err.array(),
                message: "invalid data"
            });
        }

        const {filename, content} = req.body;
        const post = await homeServices.createPost({
            filename,
            content
        })
        if(!post){
            res.status(400).json({
                message: 'server error'
            })
        }
        res.redirect("/home");
    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
    }
};

module.exports.showfile = async (req, res) => {
    try{
        const files = await homeServices.getfiles();
        if(!files){
            res.status(400).json({
                message: 'server error'
            })
        }
        res.render('index', { files: files });
    } catch (error) {
        res.status(500).json({
            message: 'server error'
        })
    }
}