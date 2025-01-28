const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ error: 'Unauthorise' });
    }

    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        return next();

    }catch{
        return res.status(401).json({ error: 'Unauthorise' });
    }
}

module.exports = auth;

