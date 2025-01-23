const fileModel = require('../models/files.models');

module.exports.createFile = async({path, originalname, user}) => {
    if(!path || !originalname || !user){
        throw new Error("Require all Fields");
    }
    const file =  await fileModel.create({
        path,
        originalname,
        user
    });
    return file;
}