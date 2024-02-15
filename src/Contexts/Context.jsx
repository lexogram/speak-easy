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
import { fetchRecordings } from './FetchRecordings'
// import { getRecorder } from '../Pages/Play/Recorder'



const DEFAULT_CUE_DELAY = 500
const delayStrings = {
  0:    "0 s",
  500:  "0.5 s",
  1000: "1 s",
  1500: "1.5 s",
  2000: "2 s"
}

const DEFAULT_DURATION = 3000
const durationStrings = {
  2000: "2 s",
  3000: "3 s",
  4000: "4 s",
  5000: "5 s",
  "click": "Press Stop Button"
}

const DEFAULT_PAUSE = 1000
const pauseStrings = {
  500:  "0.5 s",
  1000: "1 s",
  2000: "2 s",
  3000: "3 s",
  "click": "Press Next Button"
}

const settingTitles = {
  "auto-run":        "Auto Run",

  "no-scanning":     "Standard buttons",
  "switch-scanning": "Switch scanning",
  "one-touch":       "One-Touch scanning",
  "show-repeat":     "Show Repeat button",
  "scan-menu":       "Enable menu access",

  "delay":           "Delay between audio prompt and video cue",
  "duration":        "Recording duration",
  "pause":           "Pause before playing next sound",
  "show-video":      "Show video as audio prompt plays?",
  "replay-prompt":   "Replay audio before recording?",
  "silent-video":    "Show silent video while recording?"
}



export const Context = createContext()



export const Provider = ({ children }) => {
  const [ error, setError ] = useState("")
  const [ ready, setReady ] = useState(false)
  const [ mimeType, setMimeType ] = useState("")
  const [ page, setPage ] = useState("Welcome")
  const [ lastPage, setLastPage ] = useState(page)

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

  const [ scanning, setScanning ] = useState(
    storage.getItem("scanning") || "none"
  )
  const [ showRepeat, setShowRepeat ] = useState(
    storage.getItem("showRepeat") || true
  )
  const [ scanMenu, setScanMenu ] = useState(
    storage.getItem("scanMenu") || true
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
  const [ replayPrompt, setReplayPrompt ] = useState(
    storage.getItem("replayPrompt") || false
  )
  const [ silentVideo, setSilentVideo ] = useState(
    storage.getItem("silentVideo") || false
  )


  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    language,
    sounds,
    sound,
    demo,
    words,
    word,
    files,
    recordings
  } = state


  if (word) {
    // word has been selected, played, recorded or listened to
    storage.setItem("word", word)
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


  const loadRecordings = payload => {
    const action = {
      type: "LOAD_RECORDINGS",
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
    if (typeof page !== "string") {
      // Call came from settings
      page = lastPage
    } else if (page !== "Settings") {
      setLastPage(page)
    }

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
    // Ensure recording duration is timed out when using autoRun
    if (value && duration === "click") {
      interceptDuration(DEFAULT_DURATION)
    }
  }


  const interceptScanning = value => {
    setScanning(value)
    storage.setItem("scanning", value)
  }
  const interceptRepeat = value => {
    setShowRepeat(value)
    storage.setItem("showRepeat", value)
  }
  const interceptScanMenu = value => {
    setScanMenu(value)
    storage.setItem("scanMenu", value)
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
  const interceptReplayPrompt = value => {
    setReplayPrompt(value)
    storage.setItem("replayPrompt", value)
  }
  const interceptSilentVideo = value => {
    setSilentVideo(value)
    storage.setItem("silentVideo", value)
  }


  const checkForUserMedia = () => {
    if ( !navigator.mediaDevices
      || !navigator.mediaDevices.getUserMedia
      || !("MediaSource" in window)
       ) {
      return treatUserMediaError()
    }

    // MediaDevices.getUserMedia() is available. Determine what
    // mimeType to use for recordings.
    navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(chooseBestMimeType, treatUserMediaError)
  }


  const treatUserMediaError = () => {
    setError(
      "MediaDevices.getUserMedia() is not supported on your browser.\nIt will not be possible to record your voice."
    )
    return goToPage("Error")
  }


  const chooseBestMimeType = (stream) => {
    let mimeTypes = [
      "audio/mp3",
      "audio/webm",             // Firefox
      "audio/mp4",              // Safari 
      "audio/webm;codecs=opus", // Chrome, Opera, Edge
      ""
    ]
    mimeTypes.some( mimeType => {
      if (MediaSource.isTypeSupported(mimeType)) {
        // Safari "supports" audio/webm, but fails to create a
        // MediaRecorder using this mimeType
        try {
          const mediaRecorder = new MediaRecorder(
            stream, { mimeType }
          )
          setMimeType(mimeType)
          return true

        } catch (error) {
          return false
        }
      }
    })
  }


  useEffect(checkForUserMedia, [])
  useEffect(() => { fetchData(initializeReducer) }, [])
  useEffect(() => { fetchRecordings(loadRecordings) }, [])
  useEffect(
    () => { setReady(mimeType && !!sounds) },
    [sounds, mimeType]
  )


  return (
    <Context.Provider
      value ={{
        error,
        ready,
        mimeType,

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

        recordings,

        autoRun,

        scanning,
        showRepeat,
        scanMenu,

        cueDelay,
        duration,
        pause,
        showVideo,
        replayPrompt,
        silentVideo,
        delayStrings,
        durationStrings,
        pauseStrings,
        settingTitles,

        setAutoRun:      interceptAutoRun,

        setScanning:     interceptScanning,
        setShowRepeat:   interceptRepeat,
        setScanMenu:        interceptScanMenu,

        setCueDelay:     interceptCueDelay,
        setDuration:     interceptDuration,
        setPause:        interceptPause,
        setShowVideo:    interceptShowVideo,
        setReplayPrompt: interceptReplayPrompt,
        setSilentVideo:  interceptSilentVideo,
      }}
    >
      {children}
    </Context.Provider>
  )
}