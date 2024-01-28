/**
 * src/Components/Button.jsx
 */


import React, { useState } from 'react'


export const Button = ({ action, name, colours={}}) => {
  const [ hover, setHover ] = useState(false)
  const [ down, setDown ] = useState(false)


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
    backgroundColor: (down)
                     ? c.bgd
                     : (hover) ? c.bgh : c.bg,
    borderColor: (hover) ? c.bdh : (down) ? c.bdd : c.bd,
    borderStyle: (down) ? "inset" : "outset",
    color: (down) ? c.cd : c.c
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