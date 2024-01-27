/**
 * src/Components/Buttons.jsx
 */


import React from 'react'
import { Next } from './Next'


export const Buttons = ({ listeners }) => {


  return (
    <div id="buttons">
      <Next
        action={listeners.showNext}
      />
    </div>
  )
}