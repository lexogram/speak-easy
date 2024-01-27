/**
 * src/Components/Buttons.jsx
 */


import React from 'react'
import { ToggleAuto } from './ToggleAuto'
import { PlayPrompt } from './PlayPrompt'
import { Record } from './Record'
import { Stop } from './Stop'
import { Next } from './Next'


export const Buttons = ({ listeners, auto }) => {


  return (
    <div id="buttons">
      <ToggleAuto
        toggleAuto={listeners.toggleAuto}
        auto={auto}
      />
      <PlayPrompt
        action={listeners.playPrompt}
      />
      <Record
        action={listeners.startRecording}
      />
      <Stop
        action={listeners.endRecording}
      />
      <Next
        action={listeners.showNext}
      />
    </div>
  )
}