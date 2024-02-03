/**
 * src/Pages/Success.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Success = () => {
  let { words, sound, goToPage } = useContext(Context)
  const done = words
    .filter( word => word !== "--demo--")
    .map( word => word.replace(/\d+-/, ""))

  if (sound === 'kc') {
    sound = "KC"
  }



  return (
    <div id="success">
      <h1>Well done!</h1>
      <h2>You completed practice with <span>{done.length}</span> different words starting with the sound <em>{sound}</em>:</h2>
      <p>{done.join(", ")}</p>
      

      <button
        onClick={() => goToPage("Choose")}
      >
        Choose Another Sound to Practise
       </button>
    </div>
  )
}