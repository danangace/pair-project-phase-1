const Event = require('../models').Event;
const Customer = require('../models').Customer;
const CustomerEvent = require('../models').CustomerEvent;
const nodemailer = require('nodemailer')

class EventController {

    static orderTicket(req,res){
        let customer = {name: req.session.user.name, email: req.session.user.email}
        Event.findByPk(req.params.id)
            .then((data) => {
                let event = data.dataValues;
                if(event.seats < event.maxSeats) {
                    res.render('order/order', {event, customer});
                } else if(event.seats == event.maxSeats) {
                    res.redirect('/');
                }
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static formOrder(req,res) {
        let customer = {name: req.session.user.name, email: req.session.user.email, id: req.session.user.id}
        let order = {}
        let events;
        Event.findByPk(req.params.id)
            .then((event) => {
                events = event
                if(event.maxSeats - event.seats >= Number(req.body.quantity)) {
                    let updatedSeats = event.seats + Number(req.body.quantity);
                    order.quantity = req.body.quantity
                    order.price = req.body.quantity * event.price
                    return Event.update({seats: updatedSeats}, {where: {id: event.id}})
                } else {
                    res.redirect(`/events/${req.params.id}/order`);
                }
            })
            .then(data => {
                console.log({
                    CustomerId: customer.id,
                    EventId: events.id
                })
                return CustomerEvent.create({
                    CustomerId: customer.id,
                    EventId: events.id
                })
            })
            .then(success=>{
                res.render('order/confirmation', { customer, order, events });
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static sendEmail(req,res){
        let customer = { name: req.body.name }
        const output = `
        <p>This is your purchase ticket</p>
        <h3>Purchase Detail</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Event: ${req.body.eventname}</li>
            <li>Total Ticket: ${req.body.quantity}</li>
            <li>Price: ${req.body.price}</li>
            <li>Total Payment: ${req.body.payment}</li>
        `;

        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account');
                console.error(err);
                return process.exit(1);
            }
        
            console.log('Credentials obtained, sending message...');
        
            // NB! Store the account object values somewhere if you want
            // to re-use the same account for future mail deliveries
        
            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport(
                {
                    host: account.smtp.host,
                    port: account.smtp.port,
                    secure: account.smtp.secure,
                    auth: {
                        user: account.user,
                        pass: account.pass
                    },
                    logger: true,
                    debug: false // include SMTP traffic in the logs
                },
                {
                    // default message fields
        
                    // sender info
                    from: 'Nodemailer <example@nodemailer.com>',
                    headers: {
                        'X-Laziness-level': 1000 // just an example header, no need to use this
                    }
                }
            );
        
            // Message object
            let message = {
                // Comma separated list of recipients
                to: '<danangbahari89@gmail.com>',
        
                // Subject of the message
                subject: 'Nodemailer is unicode friendly ✔' + Date.now(),
        
                // plaintext body
                text: 'Hello to myself!',
        
                // HTML body
                html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
                <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,
        
                // AMP4EMAIL
                amp: `<!doctype html>
                <html ⚡4email>
                  <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
                    <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
                      <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
                  </body>
                </html>`,
            };
        
            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.log('Error occurred');
                    console.log(error.message);
                    return process.exit(1);
                }
        
                console.log('Message sent successfully!');
                console.log(nodemailer.getTestMessageUrl(info));
        
                // only needed when using pooled connections
                transporter.close();
            });
        });
        // setelah kirim email mau kamana
    }

    static update(req,res){
        Event.findAll({
            where:{
                name: req.body.eventname
            },
            include: [Customer]
        })
        .then(event=>{
            console.log(event)
            res.send(event)
        })
        .catch(err=>{
            res.send(err.message)
        })
    }
}

module.exports = EventController;