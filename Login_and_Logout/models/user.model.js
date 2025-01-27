const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
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

userSchema.methods.comparePassword = async function(password, hashPassword) {
    const pass = await bcrypt.compare(password, hashPassword);
    return pass
}

userSchema.statics.hashPassword = async function (password){
    const pass = await bcrypt.hash(password,10);
    return pass;
}

userSchema.methods.generateToken = function(){
    const token = jwt.sign({
        userID: this._id,
        email: this.email,
        name: this.name
    }, process.env.SECRET_KEY)
    return token
}

const user = mongoose.model('user', userSchema);

module.exports = user;