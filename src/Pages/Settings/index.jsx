/**
 * src/Pages/Settings/index.jsx
 *
 * -[x] Auto-run
 * -[x] Cue delay
 * -[x] Record duration
 * -[x] Show silent video during recording
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


import React, { useContext } from 'react'
import { Context } from '../../Contexts/Context'

import { SelectSlider } from './Widgets/SelectSlider'
import { Checkbox } from './Widgets/Checkbox'




export const Settings = (props) => {
  const {
    autoRun,
    setAutoRun,
    cueDelay,
    setCueDelay,
    duration,
    setDuration,
    pause,
    setPause,
    showVideo,
    setShowVideo,
    silentVideo,
    setSilentVideo,
    delayStrings,
    durationStrings,
    pauseStrings,
    settingTitles,
    scanning,
    setScanning
  } = useContext(Context)
  

  return (
    <div id="settings">
      <h1>Settings: recording</h1>
      <hr />
      <Checkbox
        id="auto-run"
        title={settingTitles["auto-run"]}
        checked={autoRun}
        action={() => setAutoRun(!autoRun)}
      />
      <SelectSlider
        title={settingTitles["pause"]}
        className="pause"
        stringMap={pauseStrings}
        value={pause}
        action={setPause}
      />
      <SelectSlider
        title={settingTitles["delay"]}
        stringMap={delayStrings}
        value={cueDelay}
        action={setCueDelay}
      />
      <SelectSlider
        title={settingTitles["duration"]}
        stringMap={durationStrings}
        value={duration}
        action={setDuration}
      />
      <Checkbox
        id="show-video"
        title={settingTitles["show-video"]}
        checked={showVideo}
        action={() => setShowVideo(!showVideo)}
      />
      <Checkbox
        id="silent-video"
        title={settingTitles["silent-video"]}
        checked={silentVideo}
        action={() => setSilentVideo(!silentVideo)}
      />
      <div className="scanning">
        <h1>Settings: scanning</h1>
        <hr />
        <label htmlFor="no-scanning">
          <input
            type="radio"
            name="scanning"
            id="no-scanning"
            disabled
            checked={scanning === "none"}
            onChange={() => setScanning("none")}
          />
          <span>{settingTitles["no-scanning"]}</span>
        </label>
        <label htmlFor="switch-scanning">
          <input
            type="radio"
            name="scanning"
            id="switch-scanning"
            disabled
            checked={scanning === "switch"}
            onChange={() => setScanning("switch")}
          />
          <span>{settingTitles["switch-scanning"]}</span>
        </label>
        <label htmlFor="one-touch">
          <input
            type="radio"
            name="scanning"
            id="one-touch"
            disabled
            checked={scanning === "one-touch"}
            onChange={() => setScanning("one-touch")}
          />
          <span>{settingTitles["one-touch"]}</span>
        </label>
            </div>
      </div>
  )
}