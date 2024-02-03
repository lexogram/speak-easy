/**
 * Context.jsx
 * description
 */

import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useRef
} from 'react'
import { reducer, initialState } from './Reducer'
import storage from './Storage'
import { fetchData } from './FetchData'
import { getRecorder } from './Record'

console.log("storage.get():", storage.get());



const DEFAULT_CUE_DELAY = 500
const delayStrings = {
  0:    "0 s",
  500:  "0.5 s",
  1000: "1 s",
  1500: "1.5 s",
  2000: "2 s"
}

const DEFAULT_DURATION = 2500
const durationStrings = {
  2000: "2 s",
  2500: "2.5 s",
  3000: "3 s",
  4000: "4 s",
  5000: "5 s"
}

const DEFAULT_PAUSE = 1000
const pauseStrings = {
  500:  "0.5 s",
  1000: "1 s",
  2000: "2 s",
  3000: "3 s",
  "click": "Press Next button"
}

const settingTitles = {
  "auto-run":        "Run activity automatically?",
  "delay":           "Delay between audio prompt and video cue",
  "duration":        "Recording duration",
  "pause":           "Pause before playing next sound",
  "show-video":      "Show video as audio prompt plays?",
  "silent-video":    "Show silent video while recording?",
  "no-scanning":     "Standard buttons",
  "switch-scanning": "Switch scanning",
  "one-touch":       "One-Touch scanning"
}



export const Context = createContext()



export const Provider = ({ children }) => {

  const startRef = useRef()
  const stopRef = useRef()
  const playRef = useRef()

  const [ ready, setReady ] = useState(false)
  const [ page, setPage ] = useState("Welcome")
  // step is used to highlight the currently active button in
  // Play when autoRun is true
  const [ step, setStep ] = useState()
  const [ menuIsOpen, setMenuIsOpen ] = useState(false)
  const [ menuShown, setMenuShown ] = useState(false)

  const [ autoRun, setAutoRun ] = useState(
    storage.getItem("autoRun") === undefined
    ? true
    : storage.getItem("autoRun")
  )
  const [ cueDelay, setCueDelay ] = useState(
    storage.getItem("cueDelay") || DEFAULT_CUE_DELAY
  )
  const [ duration, setDuration ] = useState(
    storage.getItem("duration") || DEFAULT_DURATION
  )
  const [ pause, setPause ] = useState(
    storage.getItem("pause") || DEFAULT_PAUSE
  )
  const [ showVideo, setShowVideo ] = useState(
    storage.getItem("showVideo") || false
  )
  const [ silentVideo, setSilentVideo ] = useState(
    storage.getItem("silentVideo") || false
  )
  const [ scanning, setScanning ] = useState(
    storage.getItem("scanning") || "none"
  )



  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    language,
    sounds,
    sound,
    demo,
    words,
    word,
    files
  } = state

  if (word) {
    // word has been selected, played, recorded or listened to
    storage.setItem("word", word)
  }

  const startRecording = startRef.current
  const stopRecording = stopRef.current
  const playback = playRef.current


  const recorderCallback = ( error, controls ) => {
    if (error) {
      // TODO: Warn the user that recording won't work
      alert(error)
      return
    }

    const { startRecording, stopRecording, playback } = controls

    startRef.current = startRecording
    stopRef.current = stopRecording
    playRef.current = playback
  }




  const initializeReducer = payload => {
    const { language, sound, word } = storage.get()

    payload = { ...payload, language, sound, word }
    const action = {
      type: "SET_DATA",
      payload
    }

    dispatch(action)
  }


  const setLanguage = payload => {
    const action = {
      type: "SET_LANGUAGE",
      payload
    }

    dispatch(action)
  }


  const setSound = payload => {
    const action = {
      type: "SET_SOUND",
      payload
    }

    dispatch(action)
  }


  const showNext = () => {
    const action = {
      type: "SHOW_NEXT"
    }

    dispatch(action)
  }


  const goToPage = page => {
    setPage(page)

    if (!menuShown) {
      setMenuShown(true)
    }
  }

  const interceptLanguage = value => {
    setLanguage(value)
    storage.setItem("language", value)
  }
  const interceptSound = value => {
    setSound(value)
    storage.setItem("sound", value)
  }
  const interceptAutoRun = value => {
    setAutoRun(value)
    storage.setItem("autoRun", value)
  }
  const interceptCueDelay = value => {
    setCueDelay(value)
    storage.setItem("cueDelay", value)
  }
  const interceptDuration = value => {
    setDuration(value)
    storage.setItem("duration", value)
  }
  const interceptPause = value => {
    setPause(value)
    storage.setItem("pause", value)
  }
  const interceptShowVideo = value => {
    setShowVideo(value)
    storage.setItem("showVideo", value)
  }
  const interceptSilentVideo = value => {
    setSilentVideo(value)
    storage.setItem("silentVideo", value)
  }
  const interceptScanning = value => {
    setScanning(value)
    storage.setItem("scanning", value)
  }


  useEffect(() => { fetchData(initializeReducer) }, [])
  useEffect(() => {
    getRecorder(recorderCallback, new Audio())
  }, [])
  useEffect(() => {
    setReady(!!sounds)
  }, [sounds])


  return (
    <Context.Provider
      value ={{
        ready,

        startRecording,
        stopRecording,
        playback,

        language,
        sounds,
        sound,
        demo,
        words,
        word,
        files,

        setLanguage: interceptLanguage,
        setSound:    interceptSound,
        showNext,

        step,
        setStep,

        page,
        goToPage,
        menuShown,
        menuIsOpen,
        setMenuIsOpen,

        autoRun,
        cueDelay,
        duration,
        pause,
        showVideo,
        silentVideo,
        delayStrings,
        durationStrings,
        pauseStrings,
        settingTitles,
        scanning,

        setAutoRun:     interceptAutoRun,
        setCueDelay:    interceptCueDelay,
        setDuration:    interceptDuration,
        setPause:       interceptPause,
        setShowVideo:   interceptShowVideo,
        setSilentVideo: interceptSilentVideo,
        setScanning:    interceptScanning,
      }}
    >
      {children}
    </Context.Provider>
  )
}