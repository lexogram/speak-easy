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
let timeOut
let lastWord


export const Play = () => {
  const {
    sound,
    word,
    files,
    startRecording,
    stopRecording,
    showNext,
    step,
    setStep,
    autoRun,
    cueDelay,
    duration,
    pause,
    showVideo,
    silentVideo,
    goToPage
  } = useContext(Context)

  lastWord = word

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
    setStep("video")
    timeOut = setTimeout(startVideo, cueDelay)
  }


  const startVideo = () => {
    videoRef.current.play()
  }


  const beginRecording = ({ type }) => {
    if (autoRun || type === "click") {
      timeOut = setTimeout(endRecording, duration)
      startRecording()
      setStep("record")
    } else {
      setStep("canRecord")
    }
  }


  const endRecording = () => {
    stopRecording()
    timeOut = setTimeout(nextWord, duration)
    setStep("listen")
  }


  const nextWord = () => {
    setStep("next")
    if (autoRun) {
      timeOut = setTimeout(showNext, pause)
    }
  }


  const cleanUp = () => {
    stopRecording() // no error if no recording in progress
    clearTimeout(timeOut)
  }


  const doAutoRun = () => {
    if (autoRun) {
      playPrompt()
    }

    return cleanUp
  }


  const showSuccess = () => {
    let timedOut = true
    setTimeout(() => {
      timedOut = false
    }, 0)

    // Clean up function will be triggered if this is not the
    // StrictMode test and the last word was undefined, so an
    // empty string was rendered.
    return () => {
      if (!timedOut && !lastWord) {
        goToPage("Success")
      }
    }
  }


  useEffect(doAutoRun, [audio])
  useEffect(showSuccess, [!word])



  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"

  const listeners = {
    beginRecording,
    endRecording,
    showNext,
    playPrompt,
  }


  if (!word) {
    return ""
  }


  const videoClass = step === "video"
                  || (step === "play" && showVideo)
                  || (step === "record" && silentVideo)
    ? "video visible"
    : "video"
  const cueClass = step === "video"
    ? "cue gold"
    : "cue"


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
      <div className={videoClass}>
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
      </div>
      <p>
        <span className="prompt">{prompt}</span>
        <span className={cueClass}>{cue}</span>
        <span>{mark}</span>
      </p>

      <Buttons
        listeners={listeners}
      />
    </div>
  )
}