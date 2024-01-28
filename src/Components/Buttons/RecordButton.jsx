/**
 * src/Components/RecordButton.jsx
 */


import React from 'react'
import { Button } from './Button'


export const RecordButton = (props) => {
  const { step } = props
  const isActive = step === "record"

  const colours = {
    bgh: "#711",
    bgd: "#400",
    bdd: "#711",
    bdh: "#933",
  }

  const className = `progress${isActive ? " recording" : ""}`

  return (
    <div className="record-button">
      <Button
        {...props}
        colours={colours}
      />
      <div className="frame">
        <div className={className} />
      </div>
    </div>
  )
}