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
import { Slider } from './Widgets/Slider'


const MIN_CUE_DELAY = 0
const DEFAULT_CUE_DELAY = 500
const MAX_CUE_DELAY = 2000
const CUE_STEPS = 5 // 0 500 1000 1500 2000


export const Settings = (props) => {
  const [ cueDelay, setCueDelay ] = useState(DEFAULT_CUE_DELAY)


  return (
    <div id="settings">
      <h1>Settings</h1>
      <Slider
        min={MIN_CUE_DELAY}
        max={MAX_CUE_DELAY}
        value={cueDelay}
        precision={0}
        steps={CUE_STEPS}
        onDrag={setCueDelay}
      />
    </div>
  )
}