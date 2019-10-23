const express = require('express');
const app = express();
const HomeRoute = require('./routes');
const EventRoute = require('./routes/EventRoute.js');
const CustomerRoute = require('./routes/CustomerRoute.js');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', HomeRoute);
app.use('/customers', CustomerRoute);
app.use('/events', EventRoute);

app.listen(3000, () => 'Listening on port: 3000');