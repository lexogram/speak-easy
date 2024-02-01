/**
 * src/Components/Buttons.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../Contexts/Context'
import { Button } from './Button'
import { RecordButton } from './RecordButton'


export const Buttons = ({ listeners, auto }) => {
  const { step } = useContext(Context)

  return (
    <div id="buttons">
      <Button
        action={listeners.playPrompt}
        name="Play"
        role="play"
        step={step}
      />
      <RecordButton
        action={listeners.beginRecording}
        name="Record"
        role="record"
        step={step}
      />
      <Button
        action={listeners.endRecording}
        name="Stop"
        role="stop"
        step={step}
      />
      <Button
        action={listeners.playBack}
        name="Listen"
        role="listen"
        step={step}
      />
      <Button
        action={listeners.showNext}
        name="Next"
        role="next"
        step={step}
      />
    </div>
  )
}