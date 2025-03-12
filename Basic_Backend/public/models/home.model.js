const mongoose = require('mongoose');

const homeSchema = mongoose.Schema({
    filename:{
        type: String,
        require: [true, 'filename is required'],
        minlength: [3, ' name must be atlest 3 characters long']
    },
    content:{
        type: String,
        require: [true, 'content is required'],
    }
})

const home = mongoose.model('home', homeSchema);

module.exports = home;