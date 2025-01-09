const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require('./db/db')
connectToDB();

const userRouter = require('./routes/user.routes');

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user',userRouter);

module.exports = app;