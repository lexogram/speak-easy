/**
 * src/Pages/Welcome.jsx
 */


import React from 'react'
import logo from '../assets/logo.png'


export const Welcome = ({ setPage }) => {


  return (
    <div id="welcome">
      <img src={logo} alt="logo" />
       <h1>Speech Sounds on Cue</h1>
       <button 
        onClick={() => setPage("Settings")}
       >
        Settings
       </button>
       <button 
        onClick={() => setPage("Choose")}
       >
        Start
       </button>
    </div>
   
  )
}