const express = require('express')
const socketio = require('socket.io')
const db = require('./database')
const api = require('./routes/api')

const http = require('http')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({ extenstion: true }))


console.log(io.sockets.clients());
io.on('connection', function (socket) {
  socket.on('connected', function (data) {
    console.log('New device connected with number '+data.phone)
    db.Message.findAll({
      where:{
        to : data.phone,
        receivedOn : '',
      }
    }).then((d)=>{
      d.forEach((obj)=>{
        socket.emit('receive_msg', obj)
      })
      db.Message.update({
        receivedOn : Date.now()
      },{
        where : {
          to : data.phone,
          receivedOn : '',
        }
      })
    })
    console.log('All undelivered messages are now delivered to '+ data.phone)
  })

  socket.on('send_msg', function(data){
    db.Message.create(data).then((message)=>{
      console.log('New message added to database!')
    }).catch((error) =>{
      console.error(error)
    })
  })
})

app.use('/api', api)

server.listen(3000, function () {
  console.log('App running on http://localhost:3000')
})