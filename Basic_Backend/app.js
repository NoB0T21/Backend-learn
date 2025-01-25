const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const homeRouter = require('./routers/home.routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', homeRouter);

module.exports = app;