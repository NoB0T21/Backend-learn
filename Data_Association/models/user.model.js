const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    imageURI:{
        type: String,
        default: '/uploads/user.png'
    },
});

userSchema.statics.hashPassword = async function (password){
    const pass = await bcrypt.hash(password,10);
    return pass;
}

userSchema.methods.generateToken = function (){
    const token = jwt.sign({
        userID: this._id,
        email: this.email,
        username: this.username
    }, process.env.SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async function(password, hashpassword) {
    const pass = await bcrypt.compare(password, hashpassword)
    return pass;
}

const user = mongoose.model('user', userSchema);

module.exports = user;