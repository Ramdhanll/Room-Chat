import React, { useState, useEffect } from 'react'
import queryString from 'query-string' // this module help us with retrieve data from url
import io from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import onlineIcon from '../../icons/onlineIcon.png'
import './Chat.css';
let socket;

function Chat({location}) {
   const [name, setName] = useState("")
   const [room, setRoom] = useState("")
   const [message, setMessage] = useState("")
   const [messages, setMessages] = useState([])
   const [members, setMembers] = useState([])
   const ENDPOINT = 'https://react-room-chat-application.herokuapp.com/'

   useEffect(() => {
      const { name, room } = queryString.parse(location.search)

      socket = io(ENDPOINT)

      setName(name)
      setRoom(room)

      socket.emit('join', { name, room }, (error) => {
         if(error) {
            alert(error);
         }
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

      socket.on('roomData', ({room, users}) => {
         setMembers(users)
         console.log('members', users)
      } )
   }, [messages])

   // useEffect(() => {
   //    socket.on('roomData', ({room, users}) => {
   //       setMembers(users)
   //       console.log('members', users)
   //    } )
   // }, [members])

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
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
         </div>
         <div className="userInRoom">
            <div className="navbar">
               <h3>Members</h3>
            </div>
            <div className="members">
               <ul>
                  {
                     members.map((member, i) => (
                        <li key={i}> 
                           <img className="onlineIcon" src={onlineIcon} alt="online" /> { member.name}
                        </li> )
                     )
                  }
               </ul>
            </div>
         </div> 
      </div>
   )
}

export default Chat
