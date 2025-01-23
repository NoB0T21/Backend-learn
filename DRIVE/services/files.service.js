const fileModel = require('../models/files.models');

module.exports.createFile = async({path, originalname, user}) => {
    if(!path){
        throw new Error("Require all path");
    }if (!originalname) {
        throw new Error("Require all originalname");
    } if (!user) {
        throw new Error("Require all user");
    }

    const file =  await fileModel.create({
        path,
        originalname,
        user
    })
    return file;
}