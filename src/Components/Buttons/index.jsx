/**
 * src/Components/Buttons.jsx
 */


import React from 'react'
import { ToggleAuto } from './ToggleAuto'
import { Button } from './Button'
import { RecordButton } from './RecordButton'


export const Buttons = ({ listeners, auto }) => {


  return (
    <div id="buttons">
      <Button
        action={listeners.playPrompt}
        name="Play"
        role="play"
      />
      <RecordButton
        action={listeners.beginRecording}
        name="Record"
        role="record"
      />
      <Button
        action={listeners.endRecording}
        name="Stop"
        role="stop"
      />
      <Button
        action={listeners.playBack}
        name="Listen"
        role="listen"
      />
      <Button
        action={listeners.showNext}
        name="Next"
        role="next"
      />
      <ToggleAuto
        toggleAuto={listeners.toggleAuto}
        auto={auto}
      />
    </div>
  )
}