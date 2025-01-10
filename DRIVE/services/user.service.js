const userModel = require('../models/user.model');

module.exports.createUser = async ({name, email, password}) =>{
    if(!name || !email || !password){
        throw new Error("Require all Fields");
    }

    const user = userModel.create({
        name,
        email,
        password
    })
    return user;
}