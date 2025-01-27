const mongoose =require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        minlength: [3, 'Must be 3 characters long']
    },
    email:{
        type: String,
    },
    image:{
        type: String,
    }
});

const user = mongoose.model('user',userSchema);

module.exports = user;