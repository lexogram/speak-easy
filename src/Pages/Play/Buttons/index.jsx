/**
 * src/Components/Buttons.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../../Contexts/Context'
import { Button } from './Button'
import { RecordButton } from './RecordButton'


export const Buttons = ({ listeners, auto }) => {
  const { autoRun, step } = useContext(Context)

  const disabled = {
    record: step === "play",
    stop:   step !== "record",
    listen: ![ "listen", "next" ].includes(step),
  }

  return (
    <div id="buttons">
      <Button
        action={listeners.playPrompt}
        name="Play"
        role="play"
        step={autoRun && step}
      />
      <RecordButton
        action={listeners.beginRecording}
        name="Record"
        role="record"
        step={step}
      />
      <Button
        action={listeners.endRecording}
        name="Stop Recording"
        role="stop"
        step={autoRun && step}
        disabled={disabled.stop}
      />
      <Button
        action={listeners.playBack}
        name="Listen"
        role="listen"
        step={autoRun && step}
        disabled={disabled.listen}
      />
      <Button
        action={listeners.showNext}
        name="Next"
        role="next"
        step={autoRun && step}
      />
    </div>
  )
}