/**
 * src/Menu/index.js
 */


import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../Contexts/Context'
import { Icon } from './Icon'
import { Checkbox } from '../Pages/Settings/Widgets/Checkbox'



const HIDE_MENU_DELAY = 2000


export const Menu = () => {
  const {
    page,
    goToPage,
    setMenuIsOpen,
    menuShown,
    sound,
    autoRun,
    setAutoRun,
    settingTitles
  } = useContext(Context)
  const [ open, setOpen ] = useState(true)


  const pageMap = [
    { key: "Play", name: "Activity", disabled: !sound},
    { key: "Demo", name: "Demo", disabled: !sound },
    { key: "Recordings", name: "Recordings" },
    { key: "Choose", name: "Choose" },
    { key: "Settings", name: "Settings" }
  ]


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


  const buttons = pageMap.map(({ key, name, disabled }) => {
    const className = `${key}${key === page ? " current-page" : ""}`
    return (
      <button
        key={key}
        className={className}
        disabled={disabled}
        onClick={setPage}
      >
        {name}
      </button>
    )
  })


  const toggleOpen = boolean => {
    if (boolean === true) {
      // The user clicked on the Menu icon
      document.body.addEventListener(
        "mousedown", toggleOpen, { once: true }
      )

    } else { // either a click on the icon, or anywhere else
      boolean = false
    }

    setOpen(boolean)
    setMenuIsOpen(boolean)
  }


  useEffect(() => {
    if (menuShown) {
      setTimeout(toggleOpen, HIDE_MENU_DELAY, false)
    }
  }, [menuShown])



  const style = {
    left: (open ? 0 : "calc(-1 * var(--menu-width))")
  }


  return (
    <div id="menu"
      style={style}
    >
      <Icon
        open={open}
        setOpen={toggleOpen}
      />

      <div className="items">
        <Checkbox
          id="auto-run"
          title={settingTitles["auto-run"]}
          checked={autoRun}
          action={() => setAutoRun(!autoRun)}
        />

        {buttons}
      </div>
    </div>
  )
}