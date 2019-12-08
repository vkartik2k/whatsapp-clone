const express = require("express")
const session = require("express-session")
const socketio = require('socket.io')
const api = require('./routes/api')

// function encrypt(text){
//     var cipher = crypto.createCipher('aes-256-cbc','wu23x7po')
//     var crypted = cipher.update(text,'utf8','hex')
//     crypted += cipher.final('hex')
//     return crypted
// }

const http = require('http')

const app = express()

const server = http.createServer(app)
const io = socketio(server)

app.use(express.json())
app.use(express.urlencoded({extenstion:true}))

// app.use(session({
//     secret: 'iloveabigstringwhichissecret'
// }))
// app.use(passport.initialize())
// app.use(passport.session())

io.on('connection', function(socket){
    socket.emit('connected')
    // socket.on('send_msg',function(data){
    //     db.groupchat.create({
    //         message : data.msg,
    //         username : data.username,
    //         time : data.time,
    //         date : data.date
    //     }).then((d) =>{
    //         io.emit('receive_msg',data)
    //     })
    // })
})

app.use('/api', api)

server.listen(3000, function(){
    console.log("App running on http://localhost:3000")
})