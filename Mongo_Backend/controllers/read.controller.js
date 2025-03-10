const userService =  require('../services/user.service');

module.exports.readUser = async (req, res) => {
    try{
        const user = await userService.findUsers();
        res.render('read',{users: user});
    }catch(err) {
        res.status(503).json({
            message: "Server error",
            error: err.message 
        });
    }
}