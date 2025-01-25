const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
    path:{
        type: String,
        require: [true,'path is required'],
    },
    originalname:{
        type: String,
        require: [true,'originalname is required'],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: [true,'user is required'],
    },
    ImageUrl:{
        type: String,
        require: [true,'user is required'],
    },
    fileType:{
        type: String,
        require: [true,'fileType is required'],
    }
});

const file = mongoose.model('file', fileSchema);

module.exports = file;