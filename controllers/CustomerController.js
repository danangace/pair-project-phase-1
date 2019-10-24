const Customer = require('../models').Customer;
const Event = require('../models').Event;
const helper = require('../helpers/checkPassword.js');

class CustomerController{

    static signUp(req,res){
        Customer.findAll({where: {email: req.body.email}})
                .then(data => {
                    if(data.length == 0) {
                        return Customer.create({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password,
                            phone: req.body.phone,
                            gender: req.body.gender,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        })
                    }
                })
                .then((data) => {
                    res.redirect(`${data.id}/edit`);
                })
                .catch((err) => {
                    res.send(err.message);
                })
    }

    static edit(req,res){
        Customer.findByPk(req.params.id)
                .then(customer => {
                    res.render('profile', {customer});
                })
    }

    static submitEdit(req,res){
        Customer.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            res.redirect('/home');
        })
    }
//danang150403
    static login(req,res){
        let customer = {}
        Customer.findOne({where: {email: req.body.email}})
        .then((data) => {
            customer = data
            let checkPassword = helper(req.body.password, data.password);
            console.log(checkPassword);
            if(checkPassword) {
                console.log('2')
                req.session.user = {
                    name: data.name,
                    email: data.email
                }
            }
            return Event.findAll()  
        })
        .then((events) => {
            events = events.map(event => event.dataValues);
            console.log({events: events});
            res.render('customer/home', {customer, events: events});
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static delete(req,res) {
        Customer.destroy({where: {id: req.params.id}})
        .then(data => {
            res.redirect('/');
        })
        .catch((err) => {
			res.send(err);
		})
    }

    static logout(req,res) {
        if(req.session.user) { //jika session user ada, delete session
            delete req.session.user;
        }
        Event.findAll()
		.then((data) => {
			data = data.map(item => item.dataValues);
			res.render('home', {data});
		})
		.catch((err) => {
			res.send(err);
		})
    }
}

module.exports = CustomerController