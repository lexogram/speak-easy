/**
 * src/Pages/Welcome.jsx
 */


import React from 'react'
import logo from '../assets/logo.png'


export const Welcome = ({ goToPage, ready }) => {


  return (
    <div id="welcome">
      <img src={logo} alt="logo" />
       <h1>Speech Sounds on Cue</h1>

       <button
        onClick={() => goToPage("Settings")}
       >
        Settings
       </button>

       <button
        onClick={() => goToPage("Choose")}
        disabled={!ready}
       >
        Start
       </button>
    </div>
  )
}