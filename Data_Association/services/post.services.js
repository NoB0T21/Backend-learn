const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

module.exports.findPosts = async ({user}) => {
    if(!user ){
        throw new Error("Require all Fields");
    }
    const post = await postModel.find({user});
    return post;
}
module.exports.findOne = async ({_id}) => {
    if(!_id ){
        throw new Error("Require all Fields");
    }
    const post = await postModel.find({_id});
    return post;
}

module.exports.createPost = async ({userid,content}) => {
    if(!userid || !content ){
        throw new Error("Require all Fields");
    }
    const post = await postModel.create({
        user: userid,
        content
    });
    return post
}