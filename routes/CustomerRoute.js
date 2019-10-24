const routes = require('express').Router();
const Customer = require('../models').Customer;
const Event = require('../models').Event;
const CustomerEvent = require('../models').CustomerEvent;

// signup
routes.post('/signUp', (req, res) => {
	Customer.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		phone: req.body.phone,
		gender: req.body.gender,
		login_status: 0})
	.then((data) => {
		let customer = data.dataValues;
		res.redirect(`${customer.id}/edit`);

	console.log('routes.post(/signUp: ', req.body)
	   // { id: 46,
    //  name: 'sdgdg',
    //  email: 'hengki01@gmail.com',
    //  password: 'sdfsdf',
    //  phone: '2434',
    //  gender: 'sdfd',
    //  login_status: false,
    //  createdAt: 2019-10-23T08:32:53.610Z,
    //  updatedAt: 2019-10-23T08:32:53.610Z } }
	Customer.findAll({where: {email: req.body.email}})
	.then(data => {
		console.log('cek email customer pas sign up: ', data);
		if(data.length == 0) {
			return Customer.create({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				phone: req.body.phone,
				gender: req.body.gender,
				login_status: 0
			})
		} else {
			
		}
	})
		.then((data) => {
			let customer = data.dataValues;
			console.log({customer});
			res.redirect(`${customer.id}/edit`);
		})
		.catch((err) => {
			res.send(err);
		})
	.catch((err) => {
			res.send(err);
		})
})

// redirect to user profile
routes.get('/:id/edit', (req, res) => {
	Customer.findByPk(req.params.id)
	.then((data) => {
		let customer = data.dataValues;
		res.render('profile', {customer});
	})
})

// after submit
routes.post('/:id/edit', (req, res) => {
	Customer.update(req.body, {where: {id: req.params.id}})
	.then(data => {
		res.redirect('/');
	})
})

// login
routes.post('/logIn', (req, res) => {
	console.log(req.body)
	let customer;
	Customer.findOne({where: {email: req.body.email, password: req.body.password}})
	.then((data) => {
		customer = data
		return Customer.update({login_status: true}, {where: {id: data.dataValues.id}})
	})
		.then((data) => {
			console.log(customer)
			res.render('customer/home', { customer });
		})
		.catch(err => {
			res.send(err);
		})
	.catch((err) => {
		res.send(err);
	})
})



routes.get('/:id/delete', (req, res) => {
	Customer.destroy({where: {id: req.params.id}})
	.then(data => {
		res.redirect('/');
	})
})

module.exports = routes;