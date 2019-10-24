const routes = require('express').Router();
const Event = require('../models').Event;
const Customer = require('../models').Customer;

routes.get('/', (req, res) => {
	Event.findAll()
	console.log('ok')
		.then((data) => {
			data = data.map(item => item.dataValues);
			res.render('home', {data});
		})
		.catch((err) => {
			res.send(err);
		})
})

module.exports = routes;
