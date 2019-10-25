const routes = require('express').Router();
const EventController = require('../controllers/EventController')

// order ticket
routes.get('/:id/order', EventController.orderTicket)

// form order
routes.post('/:id/order', EventController.formOrder)

module.exports = routes;