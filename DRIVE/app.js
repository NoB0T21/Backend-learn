const express = require('express');
const app = express();
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require('./db/db');
connectToDB();
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');
const homeRouter = require('./routes/home.routes')
const fileRouter = require('./routes/file.routes');

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use('/', homeRouter);
app.use('/user',userRouter);
app.use('/download',fileRouter);
app.use('/delete',fileRouter);

module.exports = app;