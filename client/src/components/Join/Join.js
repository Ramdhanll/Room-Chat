import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Join.css'

function Join() {
   const [name, setName] = useState("")
   const [room, setRoom] = useState("")
   const history = useHistory()

   const handleLink = (e) => {
      if(!name || !room) {
         e.preventDefault()
         alert('Masukan semua inputan !')
      }
   }

   const handlePressEnter = (e) => {
      console.log('r')
      if(!name || !room) {
         e.preventDefault()
         return alert('Masukan semua inputan !')
      } 
      history.push(`/chat?name=${name}&room=${room}`)
   }
   return (
      <div className="joinOuterContainer">
         <div className="joinInnerContainer"> 
            <h1 className="heading">Join</h1>
            <div> 
               <input placeholder="Name" 
                     className="joinInput" 
                     type="text" 
                     onChange={(e) => setName(e.target.value)}
                     onKeyPress={(e) => e.key === 'Enter' ? handlePressEnter(e) : null} /> 
            </div>
            <div> 
               <input placeholder="Room" 
                     className="joinInput mt-20" 
                     type="text" 
                     onChange={(e) => setRoom(e.target.value)} 
                     onKeyPress={(e) => e.key === 'Enter' ? handlePressEnter(e) : null} /> 
            </div>
            <Link to={`/chat?name=${name}&room=${room}`} onClick={handleLink}>
               <button className="button mt-20" type="submit">Sign in</button>
            </Link>

         </div>
      </div>
   )
}

export default Join
