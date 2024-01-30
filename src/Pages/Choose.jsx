/**
 * src/Pages/Choose.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Choose = ({ setPage }) => {
  const { sounds, sound, setSound } = useContext(Context)

  const playSound = ({ target }) => {
    // TODO: play sound on mouseEnter
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
    const className = `${symbol}${
      symbol === sound ? " current-sound" : ""
    }`

    if (symbol.length > 1 && symbol !== "kc") {
      symbol = symbol[0].toUpperCase()
             + symbol.slice(1).toLowerCase()
    } else {
      symbol = symbol.toUpperCase()
    }

    return (
      <button
        key={symbol}
        className={className}
        onMouseEnter={playSound}
        onClick={chooseSound}
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