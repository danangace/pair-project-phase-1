const routes = require('express').Router();
const CustomerController = require('../controllers/CustomerController')

// signup/create
routes.post('/signUp', CustomerController.signUp);

// redirect to user profile/edit
routes.get('/:id/edit', CustomerController.edit);

// after submit
routes.post('/:id/edit', CustomerController.submitEdit);

// login/read
routes.post('/logIn', CustomerController.login);

// delete/destroy
routes.get('/:id/delete', CustomerController.delete);

routes.get('/:id/logout', CustomerController.logout);

module.exports = routes;