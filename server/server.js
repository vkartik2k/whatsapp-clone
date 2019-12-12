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

let connectedClient = {}

io.on('connection', function (socket) {
  socket.on('connected', function (data) {
    console.log('New device connected with number '+data.phone)
    connectedClient[data.phone] = socket.id
    db.Message.findAll({
      where:{
        to : data.phone,
        receivedOn : '',
      }
    }).then((d)=>{
      db.Message.update({
        receivedOn : Date.now()
      },{
        where : {
          to : data.phone,
          receivedOn : '',
        }
      })
      d.forEach((obj)=>{
        socket.emit('receive_msg', obj)
      })
    })
    console.log('All undelivered messages are now delivered to '+ data.phone)
  })

  socket.on('send_msg', function(data){
    let arr = Object.keys(io.sockets.clients().connected)
    if(arr.includes(connectedClient[data.to])){
      data.receivedOn = Date.now()
      db.Message.create(data).then((message)=>{
        console.log('New message send directly to client.')
        io.to(connectedClient[data.to]).emit('receive_msg', message)
        io.to(connectedClient[data.from]).emit('receive_msg', message)
      }).catch((error) =>{
        console.error(error)
      })
    }
    else{
      db.Message.create(data).then((message)=>{
        console.log('New message queued in database.')
        io.to(connectedClient[message.from]).emit('receive_msg', message)
      }).catch((error) =>{
        console.error(error)
      })
    }
  })
})

app.use('/api', api)

server.listen(3000, function () {
  console.log('App running on http://localhost:3000')
})