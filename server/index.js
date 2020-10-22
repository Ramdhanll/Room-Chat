const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const PORT = process.env.PORT || 5000
const router = require('./routes/router')
const server = http.createServer(app)
const io = socketio(server)
const { addUser, removeUser, getUser, getUserInRoom } = require('./helpers/users')
const { Console } = require('console')


// middleware
app.use(cors())

io.on('connection', socket => { 
   console.log('We have new connection !!!')

   socket.on('join', ({name, room}, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room })

      if(error) return callback(error)
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`})
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`})
      socket.join(user.room)

      io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })

      callback()
   })
   
   socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id)
      io.to(user.room).emit('message', { user: user.name, text: message})
      io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })

      callback()
   })

   socket.on('disconnect', (reason) => {
      console.log('User had left !!!', reason)
      const user = removeUser(socket.id)
      if(user) {
         io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
         io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)})
      }
   })
})

app.use(router)

server.listen(PORT, () => {
   console.log(`Server has started on PORT ${PORT}`)
});
