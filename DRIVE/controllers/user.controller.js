const userModel = require("../models/user.model");
const userService = require('../services/user.service');
const { validationResult} = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            });
        }

        const {name, email, password} = req.body;
        const existingUser = await userService.findUser({name});
        if(existingUser){
            return res.status(400).redirect('/user/login');
        }
        const hashPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            name,
            email,
            password: hashPassword
        })
        res.json(user)
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "invalid data"
        });
    }
    const {name, password} = req.body;
    const user = await userService.findUser({name});
    if(!user){
        return res.status(400).json({message: "user or password is invalid"    
        });
    }
    const isMatch = await user.comparePassword(password, user.password)
    if(!isMatch){
        return res.status(400).json({message: "user or password is invalid"});
    }

    const token = user.generateToken();
    res.cookie('token',token, {httpOnly: true});
    res.json(user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.cookie('token', "", {httpOnly: true});
    res.redirect('/login');
}

