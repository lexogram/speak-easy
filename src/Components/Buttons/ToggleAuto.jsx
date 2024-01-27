/**
 * src/Components/Buttons/ToggleAuto.jsx
 */


import React from 'react'


export const ToggleAuto = ({ toggleAuto, auto}) => {


  return (
    <label htmlFor="toggle-auto">
      <input
        type="checkbox"
        id="toggle-auto"
        name="toggle_auto"
        onChange={toggleAuto}
        checked={auto}
      />
      <span>Auto-run</span>
    </label>
  )
}