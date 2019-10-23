const routes = require('express').Router();
const Customer = require('../models').Customer;
const Event = require('../models').Event;
const CustomerEvent = require('../models').CustomerEvent;

routes.post('/signUp', (req, res) => {
	console.log('routes.post(/signUp: ', req.body) //{ email: [ 'Alif', 'alif@gmail.com', 'alif', '0234234' ], password: 'Male', submit: 'Submit' }
	Customer.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		phone: req.body.phone,
		gender: req.body.gender,
		login_status: 0})
	.then((data) => {
		let customer = data.dataValues;
		console.log({customer});
		res.redirect(`${customer.id}/edit`);
	})
	.catch((err) => {
		res.send(err);
	})
})

routes.post('/logIn', (req, res) => {
	console.log('routes.post(/logIn: ', req.body) //{ email: [ 'Alif', 'alif@gmail.com', 'alif', '0234234' ], password: 'Male', submit: 'Submit' }
	Customer.findOne({where: {email: req.body.email, password: req.body.password}})
	.then((data) => {
		console.log('username & password match');
		console.log(data.dataValues);
		return Customer.update({login_status: 1}, {where: {id: data.dataValues.id}})
	})
		.then((data) => {
			console.log('data: ', data);
			res.redirect('/');
		})
		.catch(err => {
			console.log('error pas update status login');
			console.log(err);
			res.send(err);
		})
	.catch((err) => {
		console.log('error post login')
		res.send(err);
	})
})

routes.get('/:id/edit', (req, res) => {

	console.log('routes.get(/:id/edit');
	Customer.findByPk(req.params.id)
	.then((data) => {
		let customer = data.dataValues;
		console.log('routes.get(/:id/edit data: ', {customer});
		res.render('profile', {customer});
	})
})

routes.post('/:id/edit', (req, res) => {
	console.log('routes.post/:id/edit', req.body)
	Customer.update(req.body, {where: {id: req.params.id}})
	.then(data => {
		console.log('routes.post/:id/edit (data)', data);
		res.redirect(`/customers/${req.params.id}/edit`);
	})
})

routes.get('/:id/delete', (req, res) => {
	Customer.destroy({where: {id: req.params.id}})
	.then(data => {
		res.redirect('/');
	})
})

module.exports = routes;