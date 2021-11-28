const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload=require('express-fileupload');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('NewsBlogSecure'));
app.use(session({
    secret:'NewsBlogSecretSession',
    saveUninitialized:true,
    resave:true
}));
app.use(flash());
app.use(fileUpload());
/*
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json);*/

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/newsRoutes.js')
const feedbackRoutes = require('./server/routes/feedbackRoutes.js');
const routes2 = require('./server/routes/questionRoutes.js');
app.use('/', routes);
app.use('/', feedbackRoutes);
app.use('/', routes2);

app.listen(port, () => console.log(`Listening to port ${port}`));


