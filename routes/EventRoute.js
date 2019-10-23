const routes = require('express').Router();
const Customer = require('../models').Customer;
const Event = require('../models').Event;
const CustomerEvent = require('../models').CustomerEvent;

routes.get('/', (req, res) => {
	//include sign-up & sign-in //findAll event
	Event.findAll()
	.then((data) => {
		data = data.map(item => item.dataValues);
		//console.log('ini data event: ', {data});
		res.render('home', {data});
	})
	.catch((err) => {
		res.send(err);
	})
})

module.exports = routes;