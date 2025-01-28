const {validationResult} = require('express-validator');
const userServices = require('../services/user.service');
const userModel = require('../models/user.model');

module.exports.createUser = async (req,res) => {
    try{
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
        });

        const token = user.generateToken();
        res.cookie('token', token, {httpOnly: true})
        res.status(200).redirect('/profile');
    } catch{
        return res.status(400).json({
            message: "server error"
        });
    }
}

module.exports.loginUser = async (req,res) => {
    try{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({
                err: err.array(),
                message: "invalid data"
            });
        }

        const {username,password} = req.body;

        const user = await userServices.findUser({username})
        if(!user){
            return res.status(501).redirect('/user/register');
        }

        const isMatch = await user.comparePassword(password, user.password);

        if(!isMatch){
            return res.status(500).json('invalid password or username');
        }
        const token = user.generateToken();
        res.cookie('token',token, {httpOnly: true});
        res.status(200).redirect("/profile");
    } catch{
        return res.status(400).json({
            message: "server error"
        });
    }
}

module.exports.logout = (req,res) => {
    res.cookie('token','',{httpOnly: true});
    res.status(200).redirect("/user/login");
}