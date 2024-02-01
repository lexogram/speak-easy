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
import { fetchData } from './FetchData'
import { getRecorder } from './Record'

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
  const [ step, setStep ] = useState()
  const [ menuIsOpen, setMenuIsOpen ] = useState(false)
  const [ menuShown, setMenuShown ] = useState(false)

  const [ autoRun, setAutoRun ] = useState(true)
  const [ cueDelay, setCueDelay ] = useState(DEFAULT_CUE_DELAY)
  const [ duration, setDuration ] = useState(DEFAULT_DURATION)
  const [ pause, setPause ] = useState(DEFAULT_PAUSE)

  const [ showVideo, setShowVideo ] = useState(false)
  const [ silentVideo, setSilentVideo ] = useState(false)
  const [ scanning, setScanning ] = useState("none")



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


  const setWord = payload => {
    const action = {
      type: "SET_WORD",
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

    if ((page === "Play" || page === "Demo") && !menuShown) {
      setMenuShown(true)
    }
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

        setLanguage,
        setSound,
        setWord,
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

        setAutoRun,
        setCueDelay,
        setDuration,
        setPause,
        setShowVideo,
        setSilentVideo,

        scanning,
        setScanning
      }}
    >
      {children}
    </Context.Provider>
  )
}