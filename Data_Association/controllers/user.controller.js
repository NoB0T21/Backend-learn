const {validationResult} = require('express-validator');
const userServices = require('../services/user.service');
const userModel = require('../models/user.model');

module.exports.createUser = async (req,res) => {
    const err = validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({
            err: err.array(),
            message: "invalid data"
        });
    }

    const {name,username,email,password,age} = req.body

    const existingUser = await userServices.findUser({username});
    if(existingUser){
        return res.status(201).redirect('/user/login');
    }

    const hashPassword = await userModel.hashPassword(password);
    const user = await userServices.createUser({
        name,
        username,
        email,
        password: hashPassword,
        age
    })
    res.json(user);
}