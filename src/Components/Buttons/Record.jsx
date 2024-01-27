/**
 * src/Components/Record.jsx
 */


import React from 'react'


export const Record = ({ action }) => {


  return (
    <button
      onClick={action}
    >
      Record
    </button>
  )
}