const express = require("express")
const socketio = require('socket.io')
const api = require('./routes/api')

const http = require('http')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({ extenstion: true }))

io.on("connection", function (socket) {
  socket.on('connected', function (data) {
    console.log(data.phone)
  })
  socket.emit('recieve_msg', {
    mid: 134,
    content: "majak hai kya",
    to: "9999999996",
    from: "9999999999",
    deliveredOn: "1575876765747",
    receivedOn: "1575876765757",
    readOn: "575876765747"
  })
  socket.emit('recieve_msg', {
    mid: 135,
    content: "joker dekhli kya",
    to: "9999999999",
    from: "9999999996",
    deliveredOn: "1575876765747",
    receivedOn: "1575876765767",
    readOn: "575876765747"
  })
  socket.emit('recieve_msg', {
    mid: 136,
    content: "So cool no. we are having",
    to: "9999999996",
    from: "9999999999",
    deliveredOn: "1575876765747",
    receivedOn: "1575876765777",
    readOn: "575876765747"
  })
})

app.use('/api', api)

server.listen(3000, function () {
  console.log("App running on http://localhost:3000")
})