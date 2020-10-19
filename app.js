require('dotenv').config();


const express = require('express');
const path = require('path');
const app = express();
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const { upload } = require('./middlewares/imageUpload');

require('./configs/passport')(passport);


app.use(compression())

app.set('view engine', 'ejs');

//For all types
app.use(express.urlencoded({ extended: true }))


app.use(cookieParser())

// Express session
app.use(
    session({
        secret: 'secret keys haha',
        resave: true,
        saveUninitialized: true
    })
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(upload.any());
app.use(csrf({ cookie: true }))

app.use((req, res, next) => {
    const csrfToken = req.csrfToken();
    res.locals._csrf = csrfToken;
    //console.log('csrfTokenToSendToFrontEnd: ', csrfTokenToSendToFrontEnd);
    // this cookie must be XSRF-TOKEN, because already defined as default in Angular.
    res.cookie('XSRF-TOKEN', csrfToken);
    next();
});

app.set('trust proxy', 1) // trust first proxy


app.use('/admin', require('./routes/admin.route'));


module.exports = app