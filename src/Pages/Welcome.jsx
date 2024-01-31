/**
 * src/Pages/Welcome.jsx
 */


import React from 'react'
import logo from '../assets/logo.png'


export const Welcome = ({ goToPage }) => {


  return (
    <div id="welcome">
      <img src={logo} alt="logo" />
       <h1>Speech Sounds on Cue</h1>
       <button
        onClick={() => goToPage("Settings")}
        disabled
       >
        Settings
       </button>
       <button
        onClick={() => goToPage("Choose")}
       >
        Start
       </button>
    </div>
  )
}