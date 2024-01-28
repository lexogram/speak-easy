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
      />
      <RecordButton
        action={listeners.startRecording}
        name="Record"
      />
      <Button
        action={listeners.endRecording}
        name="Stop"
      />
      <Button
        action={listeners.playBack}
        name="Listen"
      />
      <Button
        action={listeners.showNext}
        name="Next"
      />
      <ToggleAuto
        toggleAuto={listeners.toggleAuto}
        auto={auto}
      />
    </div>
  )
}