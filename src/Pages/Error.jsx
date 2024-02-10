/**
 * src/Pages/Error.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'


export const Error = () => {
  const { error, goToPage } = useContext(Context)


  const message = error.split("\n").map(( paragraph, index ) => (
    <p
      key={index}
    >
      {paragraph}
    </p>
  ))


  const  goChoose = () => {
    goToPage("Choose")
  }


  return (
    <div id="error">
      <h1>Unsupported Browser </h1>
      {message}
      <button
        onClick={goChoose}
      >
        Continue without the Recording Feature
      </button>
    </div>
  )
}