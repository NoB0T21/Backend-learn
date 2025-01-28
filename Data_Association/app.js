const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const connectToDB = require('./db/db');
connectToDB();
const cookieparser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const profileRouter = require('./routes/profile.routes');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/user',userRouter);
app.use('/',profileRouter);

module.exports = app;