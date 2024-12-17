const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/register', async (req,res) => {
    let {username, name, age, password, email} = req.body;

    let user = await userModel.findOne({email});
    if(user) return res.status(500).send("user already exisest");

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async(err, hash) => {
            let user = await userModel.create({
                name,
                username,
                age,
                email,
                password: hash
            });
            
            let token = jwt.sign({email: email, userid: user._id}, "shhhhh");
            res.cookie("token", token);
            res.send("registered");
        });
    })
})

app.post('/login', async (req,res) => {
    let {password, email} = req.body;

    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong");

    bcrypt.compare(password, user.password, (err, result) => {
        if(result) return res.status(200).send("you can login");
        else res.redirect("/login");
    })
})

app.listen(3000, (req, res) => {
    console.log("listining on port 3000....")
})