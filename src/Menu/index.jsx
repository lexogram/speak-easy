/**
 * src/Menu/index.js
 */


import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Contexts/Context'
import { Icon } from './Icon'



const HIDE_MENU_DELAY = 2000


export const Menu = () => {
  const {
    page,
    goToPage,
    setMenuIsOpen,
    menuShown,
    sound
  } = useContext(Context)
  const [ open, setOpen ] = useState(true)



  const pageMap = [
    { key: "Play", name: "Activity", disabled: !sound},
    { key: "Demo", name: "Demo", disabled: !sound },
    { key: "Choose", name: "Choose" },
    { key: "Settings", name: "Settings" }
  ]


  const buttons = pageMap.map(({ key, name, disabled }) => {
    const className = `${key}${key === page ? " current-page" : ""}`
    return (
      <button
        key={key}
        className={className}
        disabled={disabled}
      >
        {name}
      </button>
    )
  })


  const toggleOpen = () => {
    setOpen(!open)
    setMenuIsOpen(!open)
  }


  useEffect(() => {
    if (menuShown) {
      setTimeout(toggleOpen, HIDE_MENU_DELAY)
    }
  }, [menuShown])


  const setPage = ({target}) => {
    const className = target.className
    const isTarget = pageMap.find(
      pageData => pageData.key === className
    )

    if (!isTarget) {
      return
    }

    goToPage(className)
  }



  const style = {
    left: (open ? 0 : "calc(-1 * var(--menu-width))")
  }


  return (
    <div id="menu"
      onClick={setPage}
      style={style}
    >
      <Icon
        open={open}
        setOpen={toggleOpen}
      />
      <div className="items">
        {buttons}
      </div>
    </div>
  )
}