const express = require('express');
const app = express();
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./db/db');
connectToDB();

const userRouter = require('./routers/user.routes');
const readRouter = require('./routers/read.routes');

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRouter);
app.use('/',readRouter);

module.exports = app;