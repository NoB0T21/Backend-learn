const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectTODB = require('./db/db');
connectTODB();

const homeRouter = require('./routers/home.routes');
const readRouter = require('./routers/read.routes');
const fileRouter = require('./routers/file.routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);
app.use('/read', readRouter);
app.use('/file', fileRouter);

module.exports = app;