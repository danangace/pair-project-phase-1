const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

app.listen(3000, () => 'Listening on port: 3000');