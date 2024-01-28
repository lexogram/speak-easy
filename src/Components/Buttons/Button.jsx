/**
 * src/Components/Button.jsx
 */


import React, { useState } from 'react'


export const Button = ({
  action,
  role,
  name,
  colours={},
  step
}) => {
  const [ hover, setHover ] = useState(false)
  const [ down, setDown ] = useState(false)

  const isActive = step === role


  const c = {
    bg:  "#222",
    bgh: "#171",
    bgd: "#040",
    bd:  "#666",
    bdd: "#171",
    bdh: "#393",
    c:   "#ddd",
    cd:  "#fff",
    ...colours
  }
  
  
  const toggleHover = ({ type }) => {
    setHover(type === "mouseenter")
  }

  function toggleDown({ type }) {
    document.body.addEventListener("mouseup", toggleDown, { once: true })

    setDown(type === "mousedown")
  }

  const style = {
    backgroundColor: (down || isActive)
                     ? c.bgd
                     : (hover) ? c.bgh : c.bg,
    borderColor:     (hover)
                     ? c.bdh
                     : (down || isActive)
                       ? c.bdd
                       : c.bd,
    borderStyle:     (down || isActive)
                     ? "inset"
                     : "outset",
    color:           (down || isActive)
                     ? c.cd
                     : c.c
  }

  return (
    <button
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onMouseDown={toggleDown}
      onClick={action}
      style={style}
    >
      {name}
    </button>
  )
}