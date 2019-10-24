const Event = require('../models').Event;
const CustomerEvent = require('../models').Event;

class EventController {

    static orderTicket(req,res){
        Event.findByPk(req.params.id)
            .then((data) => {
                let event = data.dataValues;
                if(event.seats < event.maxSeats) {
                    res.render('order/order', {event});
                } else if(event.seats == event.maxSeats) {
                    res.redirect('/');
                }
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static formOrder(req,res) {
        Event.findByPk(req.params.id)
            .then((event) => {
                console.log(event.maxSeats, event.seats, req.body.quantity)
                if(event.maxSeats - event.seats >= Number(req.body.quantity)) {
                    let updatedSeats = event.seats + Number(req.body.quantity);
                    console.log(updatedSeats);
                    return Event.update({seats: updatedSeats}, {where: {id: event.id}})
                } else {
                    res.redirect(`/events/${req.params.id}/order`);
                }
            })
            .then(data => {
                res.redirect(`/events/${req.params.id}/order`);
            })
            .catch((err) => {
                res.send(err);
            })
    }
}

module.exports = EventController;