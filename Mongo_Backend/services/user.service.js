const userModel = require('../models/user.model');

module.exports.findUsers = async () => {
    const user = await userModel.find();
    return user;
}

module.exports.findUser = async ({username}) => {
    if(!username){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOne({username});
    return user;
}

module.exports.findUserbyID = async ({userID}) => {
    if(!userID){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOne({_id: userID});
    return user;
}

module.exports.createUser = async ({username, email, image}) => {
    if(!username || !email || !image){
        throw new Error("Require all Fields");
    }

    const user = await userModel.create({username, email, image});
    return user;
}

module.exports.updateUser = async ({username, email, image, userID}) => {
    if(!username || !email || !image || !userID){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOneAndUpdate({_id: userID} ,{
        username,
        email, 
        image}, {new: true});
    return user;
}

module.exports.deleteUser = async ({userID}) => {
    if(!userID){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOneAndDelete({_id: userID});
    return user;
}