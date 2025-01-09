const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected');
    })
    .catch((err) => {
        console.log(err);
        console.log('Failed To Connect DB');
    })
}

module.exports = connectToDB;