const express = require("express")
const socketio = require('socket.io')
const api = require('./routes/api')

const http = require('http')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extenstion:true}))

io.on("connection", function(socket){
    console.log("Connection successful")
    // socket.on('connected', function(data){
    //     console.log(data.phone)
    //     console.log("avada kadavra")
    //     currentConnection.push(data.phone)
    // })
})

app.use('/api', api)

server.listen(3000, function(){
    console.log("App running on http://localhost:3000")
})