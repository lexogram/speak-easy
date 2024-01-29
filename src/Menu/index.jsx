/**
 * src/Menu/index.js
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Menu = () => {
  const { page, setPage } = useContext(Context)


  const pageMap = [
    { key: "Play", name: "Activity" },
    { key: "Demo", name: "Demo" },
    { key: "Choose", name: "Choose" },
    { key: "Settings", name: "Settings" }
  ]


  const buttons = pageMap.map(({ key, name }) => {
    const className = `${key}${key === page ? " current-page" : ""}`
    return (
      <button
        key={key}
        className={className}
      >
        {name}
      </button>
    )
  })


  const goToPage = ({target}) => {
    const className = target.className
    const isTarget = pageMap.find(
      pageData => pageData.key === className
    )

    if (!isTarget) {
      return
    }

    setPage(className)
  }


  return (
    <div id="menu"  
      onClick={goToPage}
    >
      {buttons}
    </div>
  )
}