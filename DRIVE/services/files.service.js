const fileModel = require('../models/files.models');

module.exports.createFile = async({path, originalname, user, ImageUrl, fileType}) => {
    if(!path || !originalname || !user || !ImageUrl || !fileType){
        throw new Error("Require all Fields");
    }
    const file =  await fileModel.create({
        path,
        originalname,
        user,
        ImageUrl,
        fileType
    });
    return file;
}

module.exports.getFiles = async({user}) => {
    if(!user){
        throw new Error("Require all Fields");
    }
    const files =  await fileModel.find({user});
    return files;
}

module.exports.getFile = async({user, path}) => {
    if(!user || !path){
        throw new Error("Require all Fields");
    }
    const file =  await fileModel.findOne({user,path});
    return file;
}

module.exports.deleteFile = async({user, path}) => {
    if(!user || !path){
        throw new Error("Require all Fields");
    }
    const file = await fileModel.findOneAndDelete({user, path});
}