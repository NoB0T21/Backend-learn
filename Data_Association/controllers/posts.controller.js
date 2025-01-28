const {validationResult} = require('express-validator');
const postService = require('../services/post.services');

module.exports.createPost = async (req,res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({
            err: err.array(),
            message: "invalid data"
        });
    }

    const {content} = req.body
    const userid = req.user.userID

    const post = await postService.createPost({
        userid: userid,
        content
    });
    res.status(200).redirect("/profile");
}