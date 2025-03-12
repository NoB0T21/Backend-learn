 const homeService = require('../services/home.service');
 const {validationResult} = require('express-validator');

 module.exports.editFile = async (req, res) => {
    const fileid = req.params._id;
    const file = await homeService.getfile({fileid})
    res.render('edit', {file: file});
 }

 module.exports.updateFile = async (req, res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({
            errors: err.array(),
            message: "invalid data"
        });
    }

    const fileID = req.params._id;
    const {filename, content} = req.body
    const file = await homeService.getFileAndUpdate({
        fileID,
        filename,
        content
    })
    res.render('read', {file: file})
 }