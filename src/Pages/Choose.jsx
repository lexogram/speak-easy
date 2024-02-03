/**
 * src/Pages/Choose.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Choose = ({ goToPage }) => {
  const {
    sounds,
    sound,
    setSound,
    menuIsOpen
  } = useContext(Context)

  const playSound = ({ target }) => {
    // TODO: play sound on mouseEnter
    const sound = target.className
  }

  const chooseSound = ({ target }) => {
    const className = target.className
    const sound = className.replace(/\s+current-sound/, "")

    if (sounds.indexOf(sound) < 0) {
      alert(`Unexpected sound: ${className}`)

    } else {
      setSound(sound)
      goToPage("Demo")
    }
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
    <div
      id="choose"
      className={menuIsOpen ? "menu-open" : ""}
    >
      {soundButtons}
    </div>

  )
}