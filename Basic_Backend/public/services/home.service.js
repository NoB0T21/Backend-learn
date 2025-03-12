const homeModel = require('../models/home.model');

module.exports.createPost = async ({filename, content}) =>{
    if(!filename || !content){
        throw new Error("Require all Fields");
    }

    const post = homeModel.create({
        filename,
        content
    });
    return post;
}

module.exports.getfiles = async (req, res) => {
    const files = await homeModel.find()
    return files;
}

module.exports.getfile = async ({fileid}) => {
    const file = await homeModel.findOne({_id: fileid});
    return file;
}

module.exports.getFileAndUpdate = async({fileID,filename,content}) => {
    if (!fileID || !filename || !content) {
        throw new Error("Missing required parameters: fileID, filename, or content");
      }
    const file = await homeModel.findOneAndUpdate(
        { _id: fileID },
        { filename, content },
        { new: true }
    );
    return file
}