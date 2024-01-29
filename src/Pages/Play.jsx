/**
 * src/Pages/Play.jsx
 */


import React, {
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react'
import { Context } from '../Contexts/Context'
import { Buttons } from '../Components/Buttons'


const CUE_REGEX = /(.*)\|\s*([^.!?]*)([.!?])?/
const CUE_DELAY = 1000
const RECORD_DURATION = 2000
const MAX_RECORD_DURATION = 5000
const NEXT_DELAY = 100


export const Play = () => {
  const {
    ready,
    sound,
    files,
    startRecording,
    stopRecording,
    showNext,
    step,
    setStep
  } = useContext(Context)

  const audioRef = useRef()
  const videoRef = useRef()
  const [ auto, setAuto ] = useState(false)


  // If `ready` is not true yet, then there will be no files...
  const { text, audio, video, image } = (files || {})
  // ... so we just need to pretend
  const [ , prompt, cue, mark ] = text
    ? CUE_REGEX.exec(text)
    : []


  const playPrompt = () => {
    audioRef.current.play()
    setStep("play")
  }


  const prepareVideo = () => {
    setTimeout(startVideo, CUE_DELAY)
  }


  const startVideo = () => {
    videoRef.current.play()
  }


  const setRecordingDuration = () => {
    const duration = auto ? RECORD_DURATION : MAX_RECORD_DURATION
    document.documentElement.style.setProperty(
      "--record-duration", duration + "ms"
    )
    return duration
  }


  const beginRecording = ({ type }) => {
    if (auto || type === "click") {
      const duration = setRecordingDuration()
      setTimeout(endRecording, duration)
    
      setStep("record")

    } else {
      setStep()
    }

    startRecording()
  }


  const endRecording = () => {
    stopRecording()
    if (auto) {
      setTimeout(showNext, RECORD_DURATION + NEXT_DELAY)
      setStep("listen")

    } else {
      setStep()
    }
  }


  const toggleAuto = () => {
    setAuto(!auto)
  }


  const doAutoRun = () => {
    if (ready && auto) {
      playPrompt()
    }
  }


  useEffect(doAutoRun, [audio])



  if (!ready) {
    return "Connecting..."
  }


  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"

  const listeners = {
    beginRecording,
    endRecording,
    showNext,
    playPrompt,
    toggleAuto
  }


  return (
    <div
      id="play"
    >
      <h1>{sound}</h1>
      { image && <img src={image} alt={cue} /> }
      <audio
        src={audio}
        ref={audioRef}
        onEnded={prepareVideo}
        style={{ display: "none" }}
      />
      <video
        key={video} // forces video to update
        width="320"
        ref={videoRef}
        onEnded={beginRecording}
        >
        <source
          src={video}
          type={type}
        />
      </video>
      <p>
        <span className="prompt">{prompt}</span>
        <span className="cue">{cue}</span>
        <span>{mark}</span>
      </p>

      <Buttons
        listeners={listeners}
        auto={auto}
      />
    </div>
  )
}