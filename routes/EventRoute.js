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

routes.get('/:id/order', (req, res) => {
	//include sign-up & sign-in //findAll event
	Event.findByPk(req.params.id)
	.then((data) => {
		console.log(data.dataValues);
		let event = data.dataValues;
		console.log('event: ', event);
		// { id: 1,
		//   name: 'Konser BlackPink',
		//   schedule: 2019-11-11T00:00:00.000Z,
		//   status: 'open',
		//   price: 500000,
		//   stock: 1000,
		//   venue: 'ICE BSD',
		//   createdAt: 2019-10-23T03:26:41.311Z,
		//   updatedAt: 2019-10-23T03:26:41.311Z }
		if(data.dataValues.stock > 0) {
			res.render('order', {event});
		} else if(data.dataValues.stock = 0) {
			res.redirect('/');
		}
	})
	.catch((err) => {
		res.send(err);
	})
})

routes.post('/:id/order', (req, res) => {
	//include sign-up & sign-in //findAll event
	console.log('routes.post(/:id/order (req-body)', req.body); //{ quantity: '2', email: '', submit: 'Submit' }
	Event.findByPk(req.params.id)
	.then((data) => {
		console.log(data.dataValues);
		let event = data.dataValues;
		// { id: 1,
		//   name: 'Konser BlackPink',
		//   schedule: 2019-11-11T00:00:00.000Z,
		//   status: 'open',
		//   price: 500000,
		//   stock: 1000,
		//   venue: 'ICE BSD',
		//   createdAt: 2019-10-23T03:26:41.311Z,
		//   updatedAt: 2019-10-23T03:26:41.311Z }
		if(event.stock >= req.body.quantity) {
			let updatedStock = event.stock - req.body.quantity;
			console.log('updatedStock: ', updatedStock);
			
			return Event.update({stock: updatedStock}, {where: {id: event.id}})
		} else {
			res.redirect(`/events/${req.params.id}/order`);
		}
	})
			.then(data => {
				console.log('data event setelah update stock: ', data);
				res.redirect(`/events/${req.params.id}/order`);
			})
	.catch((err) => {
		res.send(err);
	})
})

module.exports = routes;