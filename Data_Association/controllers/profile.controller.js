const userServices = require('../services/user.service');
const postService = require('../services/post.services')

module.exports.showProfile = async (req, res) => {
    const user = await userServices.findUser({username: req.user.username});
    const posts = await postService.findPosts({user: req.user.userID})
    res.status(200).render('profile', {user: user, posts});
}

module.exports.likePost = async (req, res) => {
    let post = await postService.findOne({_id: req.params.id});
    
        if(post.like.indexOf(req.user.userID) === -1){
            post.like.push(req.user.userID);
        } 
        else{
            post.like.splice(post.like.indexOf(req.user.userID), 1)
        }
    
        await post.save()
        res.redirect("/profile");
}
