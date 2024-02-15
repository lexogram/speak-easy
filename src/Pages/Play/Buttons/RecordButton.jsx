/**
 * src/Components/RecordButton.jsx
 */


import React from 'react'
import { Button } from './Button'


export const RecordButton = (props) => {
  const { step } = props
  const isActive = step === "record"
  // const disabled = !isActive && step !== "canRecord"
  const disabled = !isActive && (!step || step === "play")

  console.log("Record step:", step, ",isActive:", isActive, ", disabled:", disabled);


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
        disabled={disabled}
      />
      <div className="frame">
        <div className={className} />
      </div>
    </div>
  )
}