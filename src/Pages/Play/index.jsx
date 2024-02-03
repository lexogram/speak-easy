/**
 * src/Pages/Play.jsx
 */


import React, {
  useContext,
  useRef,
  useEffect,
} from 'react'
import { Context } from '../../Contexts/Context'
import { Buttons } from './Buttons'


const CUE_REGEX = /(.*)\|\s*([^.!?]*)([.!?])?/


export const Play = () => {
  const {
    sound,
    files,
    startRecording,
    stopRecording,
    showNext,
    setStep,
    autoRun,
    cueDelay,
    duration,
    pause,
    showVideo,
    silentVideo,
    goToPage
  } = useContext(Context)

  if (!sound) {
    return goToPage("Choose")
  }

  const audioRef = useRef()
  const videoRef = useRef()


  const { text, audio, video, image } = (files || {})
  const [ , prompt, cue, mark ] = text
    ? CUE_REGEX.exec(text)
    : []


  const playPrompt = () => {
    audioRef.current.play()
    setStep("play")
  }


  const prepareVideo = () => {
    setTimeout(startVideo, cueDelay)
  }


  const startVideo = () => {
    const video = videoRef.current
    if (video) {
      video.play()
    }
  }


  const beginRecording = ({ type }) => {
    if (autoRun || type === "click") {
      setTimeout(endRecording, duration)
    
      setStep("record")

    } else {
      setStep()
    }

    startRecording()
  }


  const endRecording = () => {
    stopRecording()
    if (autoRun) {
      setTimeout(showNext, duration + pause)
      setStep("listen")

    } else {
      setStep()
    }
  }


  const doAutoRun = () => {
    if (autoRun) {
      playPrompt()
    }
  }


  useEffect(doAutoRun, [audio])



  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"

  const listeners = {
    beginRecording,
    endRecording,
    showNext,
    playPrompt,
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
      />
    </div>
  )
}