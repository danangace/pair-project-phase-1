const routes = require('express').Router();
const Customer = require('../models').Vehicle;
const Event = require('../models').Event;
const CustomerEvent = require('../models').CustomerEvent;

routes.get('/', (req, res) => {
	//include sign-up & sign-in //findAll event
	Event.findAll()
	.then((data) => {
		data = data.map(item => item.dataValues);
		res.render('home', {data});
	})
})

module.exports = routes;
