/**
 * src/Pages/Settings/Widgets/Checkbox.jsx
 */


import React from 'react'


export const Checkbox = ({ id, title, action, checked }) => {

  return (
    <label
      htmlFor={id}
      className="checkbox"
    >
      <input
        type="checkbox"
        id={id}
        onChange={action}
        checked={checked}
      />
      <span className="toggle"></span>
      <span className="title">{title}</span>
    </label>
  )
}