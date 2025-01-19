const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

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

userSchema.methods.generateToken = function() {
    const token = jwt.sign({
        userId: user._id, 
        email: user.email},
    process.env.JWT_SECRET)
    return token;
}


userSchema.methods.comparePassword = async function(password, hashpassword) {
    const pass = await bcrypt.compare(password, hashpassword);
    return pass
}

userSchema.statics.hashPassword = async function(password) {
     const pass = await bcrypt.hash(password, 10);
     return pass
}

const user = mongoose.model('user', userSchema);

module.exports = user;