const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        minlength: [3, ' name must be atlest 3 characters long']
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        unique: true,
        minlength: [3, ' name must be atlest 3 characters long']
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;