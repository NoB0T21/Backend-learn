const express = require('express');
const app = express();
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const connectTODB = require('./db/db');
connectTODB();

const homeRouter = require('./routers/home.routes');
const readRouter = require('./routers/read.routes');
const fileRouter = require('./routers/file.routes');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);
app.use('/read', readRouter);
app.use('/file', fileRouter);

module.exports = app;