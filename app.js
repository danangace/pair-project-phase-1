const express = require('express');
const app = express();
const session = require('express-session');
const HomeRoute = require('./routes');
const EventRoute = require('./routes/EventRoute.js');
const CustomerRoute = require('./routes/CustomerRoute.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
    secret: 'tetapsemangat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
   }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/home', HomeRoute);
app.use('/customers', CustomerRoute);
app.use('/events', EventRoute);

app.listen(3000, () => 'Listening on port: 3000');