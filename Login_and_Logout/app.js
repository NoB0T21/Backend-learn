const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./DB/db');
connectToDB();
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes')


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/user', userRouter);

module.exports = app;