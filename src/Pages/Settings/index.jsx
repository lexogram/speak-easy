/**
 * src/Pages/Settings/index.jsx
 *
 * 1. Cue delay
 * 2. Record duration
 * 3. Rapid press duration
 * 4. Show silent video during recording
 *
 * ## Switch scanning
 *
 * 1. Rapid press for navigate to next button
 * 2. Wait and press to activate current button
 * 3. Buttons to scan
 *    1. Choice buttons
 *    2. Demo buttons
 *    3. Activity buttons
 *    4. Menu
 *    5. Settings
 */


import React, { useState } from 'react'
import { SelectSlider } from './Widgets/SelectSlider'


const DEFAULT_CUE_DELAY = 500
const delayStrings = {
  0:    "No delay",
  500:  "Half a second",
  1000: "One second",
  1500: "One and a half seconds",
  2000: "Two seconds"
}

export const Settings = (props) => {
  const [ cueDelay, setCueDelay ] = useState(DEFAULT_CUE_DELAY)


  return (
    <div id="settings">
      <h1>Settings</h1>
      <SelectSlider
        stringMap={delayStrings}
        value={cueDelay}
        action={setCueDelay}
      />
    </div>
  )
}