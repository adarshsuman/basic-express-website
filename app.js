var express = require('express');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/contact', function (req, res) {
    res.render('contact');
});
app.post('/contact/send', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sender\'s email',
            pass: 'sender\'s password'
        }
    });

    var mailOptions = {
        from: 'sender\' detail',
        to: 'reciever\' details',
        subject: 'Website Submission',
        text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    });
});
app.listen(port);
