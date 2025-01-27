const userModel = require('../models/user.model');

module.exports.findUsername = async ({name}) => {
    if(!name){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOne({name});
    return user;
}
module.exports.findUseremail = async ({email}) => {
    if(!email){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOne({email});
    return user;
}
module.exports.findUser = async ({name, email}) => {
    if(!name || !email){
        throw new Error("Require all Fields");
    }

    const user = await userModel.findOne({name, email});
    return user;
}

module.exports.createUser = async({name,email,password,age}) => {
    if(!name || !email || !password || !age){
        throw new Error("Require all Fields");
    }

    const user = await userModel.create({name,email,password,age});
    return user;
}