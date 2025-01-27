const mongoose = require('mongoose');

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conncted to DB');
    })
    .catch((err) => {
        console.log(err);
        console.log('Fail Conncted to DB');
    })
};

module.exports = connectToDB;