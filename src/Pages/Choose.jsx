/**
 * src/Pages/Choose.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Choose = ({ setPage }) => {
  const { sounds, sound, setSound } = useContext(Context)

  const playSound = ({ target }) => {
    const sound = target.className  
  }

  const chooseSound = ({ target }) => {
    const sound = target.className
    if (sounds.indexOf(sound) < 0) {
      // We're already at this sound
    } else {
      setSound(sound)
    }
    setPage("Demo")
  }

  const soundButtons = sounds.map( symbol => {
    const className = `${symbol}${symbol === sound ? " current-sound" : ""}`
    const disabled = ["b", "ch", "d"].indexOf(symbol) < 0
    return (
      <button
        key={symbol}
        className={className}
        onMouseEnter={playSound}
        onClick={chooseSound}
        disabled={disabled}
      >
        {symbol}
      </button>
    )
})


  return (
    <div id="choose">
      {soundButtons}
    </div>

  )
}