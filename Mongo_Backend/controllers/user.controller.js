const {validationResult} = require('express-validator');
const userServices = require('../services/user.service');

module.exports.createUser = async (req, res) => {
    try{
        const err = validationResult(req);
        if(!err.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            })
        }

        const {username, email, image} = req.body;

        const existingUser = await userServices.findUser({username});
        if(existingUser){
            res.status(203).json('Username already exist');
        }

        const user = await userServices.createUser({username, email, image});
        res.redirect('/read');
    }catch(err) {
        res.status(503).json({
            message: "Server error",
            error: err.message 
        });
    }
}

module.exports.editUser = async (req, res) => {
    try{
        const userID = req.params.id;
        const user = await userServices.findUserbyID({userID});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.render('edit',{user: user});
    }catch(err) {
        res.status(503).json({
            message: "Server error",
            error: err.message 
        });
    }
}

module.exports.updateUser = async (req, res) => {
    try{
        const err = validationResult(req);
        if(!err.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid data"
            })
        }

        const userID = req.params.id;
        const {username, email, image} = req.body;
        const user = await userServices.updateUser({username, email, image, userID});
        res.redirect('/read');
    }catch(err) {
        res.status(503).json({
            message: "Server error",
            error: err.message 
        });
    }
}

module.exports.deleteUser = async (req, res) => {
    try{
        const userID = req.params.id;
        const user = await userServices.deleteUser({userID});
        res.redirect('/read');
    }catch(err) {
        res.status(503).json({
            message: "Server error",
            error: err.message 
        });
    }
}