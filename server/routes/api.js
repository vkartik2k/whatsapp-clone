const route = require('express').Router()
const db = require('../database')

route.post('/register', function (req, res) {
  console.log(req.body)
  db.User.findOne({
    where : {
      phone : req.body.phone
    }
  }).then(function(user){
    if(user){
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
    else{
      db.User.create({
        handle: 'noobie',
        phone: req.body.phone,
        registeredOn: Date.now().toString(),
        lastSeen: Date.now().toString(),
        isActive: 'true',
        activity: 'Hey there! I am using WhatsApp.',
        displayPicture: 'null'
    }).then((user) => {
      res.send({
        status: 202,
        message: 'Device Activated for user'
      })
    }).catch((err) => {
      res.send({
        status: 404,
        message: err.toString()
      })
    })
    }
  })
})

module.exports = route