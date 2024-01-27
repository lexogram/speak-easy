/**
 * src/Components/Language.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'

export const Language = () => {
  const { setLanguage } = useContext(Context)


  return (
    <div id="language">
    <button
      onClick={() => setLanguage("ru")}
    >
      Русский
    </button>
      <button
        onClick={() => setLanguage("uk")}
      >
        UK English
      </button>
    </div>
  )
}