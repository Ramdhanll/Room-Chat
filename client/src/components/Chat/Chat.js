import React, { useState, useEffect } from 'react'
import queryString from 'query-string' // this module help us with retrieve data from url
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import './Chat.css';
let socket;

function Chat({location}) {
   const [name, setName] = useState("")
   const [room, setRoom] = useState("")
   const [message, setMessage] = useState("")
   const [messages, setMessages] = useState([])
   const ENDPOINT = 'localhost:5000'

   useEffect(() => {
      const { name, room } = queryString.parse(location.search)

      socket = io(ENDPOINT)

      setName(name)
      setRoom(room)

      socket.emit('join', { name, room }, () => {
         
      })


      return () => {
         socket.emit('disconnect')
         socket.off()
      }
   }, [ENDPOINT, location.search])

   useEffect(() => {
      socket.on('message', (message) => {
         setMessages([...messages, message])
      })
   }, [messages])

   // function for sending messages
   const sendMessage = (e) => {
      e.preventDefault()
      
      if(message) {
         socket.emit('sendMessage', message, () => setMessage(""))
      }
   }

   return (
      <div className="outerContainer">
         <div className="container">
            <InfoBar room={room}/>
            <Messages />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            {/* <input value={message} 
               onChange={(e) => setMessage(e.target.value)} 
               onKeyPress={(e) => e.key === "Enter" ? sendMessage(e) : null}/> */}
            
         </div>
      </div>
   )
}

export default Chat
