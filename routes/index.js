const routes = require('express').Router();
const Customer = require('../models').Vehicle;
const Event = require('../models').Event;
const CustomerEvent = require('../models').CustomerEvent;

routes.get('/', (req, res) => {
	//include sign-up & sign-in //findAll event
	Event.findAll()
	.then((data) => {
		data = data.map(item => item.dataValues);
		console.log({data});
		res.render('home', {data});
	})
})

// routes.get('/customer/:id', (req, res) => {
// 	res.render('customer') //show & edit customer's data
// })

module.exports = routes;
