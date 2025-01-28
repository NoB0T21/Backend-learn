const userModel = require('../models/user.model');

module.exports.findUser = async ({username}) => {
    if(!username){
        throw new Error("Require all Fields");
    }
    const user = await userModel.findOne({username});
    return user;
}

module.exports.createUser = async ({name,username,email,password,age}) => {
    if(!name || !username || !email || !password){
        throw new Error("Require all Fields");
    }
    const user = await userModel.create({
        name,
        username,
        email,
        password,
        age
    });
    return user
}