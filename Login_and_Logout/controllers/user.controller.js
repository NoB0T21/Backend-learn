const {validationResult} = require('express-validator');
const userModel = require('../models/user.model')
const userService = require('../services/user.service');

module.exports.createUser = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            });
        }

        const {name, email, password, age} = req.body;
        const existingUser = await userService.findUser({name, email})
        if(existingUser){
            return res.status(400).redirect('/user/login');
        }
        const existingUsername = await userService.findUsername({name})
        if(existingUsername){
            return res.status(400).json('This Username already exist');
        }
        const existingUsername1 = await userService.findUseremail({email})
        if(existingUsername1){
            return res.status(400).json('This Email already exist');
        }

        const hashPassword = await userModel.hashPassword(password);
        const user = await userService.createUser({
            name,
            email,
            password: hashPassword,
            age
        });

        const token = user.generateToken();
        res.cookie('token', token,{httpOnly: true})
        res.status(200).json(user)
    } catch{
        res.status(503).json({
            message: "Server error"
        });
    }
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            });
        }
        const {email, password} = req.body;
        const User = await userService.findUseremail({email})
        if(!User){
            return res.status(400).redirect('/user/register');
        }

        const isMatch = await User.comparePassword(password, User.password)
        if(!isMatch){
            return res.status(400).json({message: "user or password is invalid"});
        }
        const token = User.generateToken();
        res.cookie('token', token,{httpOnly: true})
        res.status(200).json(User)
}

module.exports.logoutUser = async (req,res) => {
    res.cookie('token', '',{httpOnly: true})
        res.redirect('/user/login')
}