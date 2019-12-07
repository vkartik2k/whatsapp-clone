const route = require("express").Router();
const User = require('../models/user');

route.post('/register', function (req, res) {

  console.log("Gochha request!")
  let query = User.where({ phone: req.body.phone });
  query.findOne(function (err, user) {
    console.log("Inside query")
    if (err) {
      res.send({
        status: 404,
        message: err.toString()
      });
    }
    if (user) {
      if (user.isActive === 'true') {
        res.send({
          status: 409,
          message: 'User active on other device'
        })
      }
      else {
        res.send({
          status: 202,
          message: 'Device Activated for user'
        })
      }
    }
    else {
      user.create({
        handle: req.body.name,
        name: req.body.name,
        phone: req.body.phone,
        registration: Date.now().toString(),
        lastSeen: Date.now().toString(),
        isActive: 'true',
        activity: 'Hey there! I am using WhatsApp.',
        dp: 'null'
      }, function (err, user) {
        if(err){
          res.send({
            status: 404,
            message: err.toString()
          });
        }
        res.send({
          status: 201,
          message: 'Welcome to Whatsapp!'
        });
      });
    }
  });
});


module.exports = route;