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
  // socket.emit('recieve_msg', {
  //   mid: 133,
  //   content: "hello",
  //   to: "9999999997",
  //   from: "9999999999",
  //   deliveredOn: "1575876765747",
  //   recievedOn: "1575876765747",
  //   readOn: "575876765747"
  // })
})

app.use('/api', api)

server.listen(3000, function () {
  console.log("App running on http://localhost:3000")
})