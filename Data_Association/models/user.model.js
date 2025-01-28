const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        minlength: [3, ' name must be atlest 3 characters long']
    },
    username:{
        type: String,
        require: true,
        unique: true,
        minlength: [3, ' name must be atlest 3 characters long']
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
        unique: true,
        minlength: [3, ' name must be atlest 3 characters long']
    },
    age:{
        type: Number,
        require: true,
    }
});

userSchema.statics.hashPassword = async function (password){
    const pass = await bcrypt.hash(password,10);
    return pass;
}

const user = mongoose.model('user', userSchema);

module.exports = user;