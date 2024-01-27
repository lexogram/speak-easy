/**
 * src/Pages/Play.jsx
 */


import React, { useContext, useRef } from 'react'
import { Context } from '../Contexts/Context'
import { Buttons } from '../Components/Buttons'


const CUE_REGEX = /(.*)\|\s*([^.!?]*)([.!?])?/
const CUE_DELAY = 1000
const RECORD_DURATION = 2000


export const Play = () => {
  const {
    ready,
    files,
    startRecording,
    stopRecording,
    showNext
  } = useContext(Context)

  const listeners = {
    startRecording,
    stopRecording,
    showNext
  }

  const audioRef = useRef()
  const videoRef = useRef()

  // If `ready` is not true yet, then there will be no files...
  const { text, audio, video, image } = (files || {})
  // ... so we just need to pretend
  const [ , prompt, cue, mark ] = text
    ? CUE_REGEX.exec(text)
    : []


  const playAudio = () => {
    audioRef.current.play()
  }


  const prepareVideo = () => {
    setTimeout(startVideo, CUE_DELAY)
  }

  const startVideo = () => {
    videoRef.current.play()
  }


  const beginRecording = () => {
    startRecording()
    setTimeout(endRecording, RECORD_DURATION)
  }


  const endRecording = () => {
    stopRecording()
  }


  if (!ready) {
    return "Connecting..."
  }


  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"


  return (
    <div
      id="play"
      onClick={playAudio}
    >
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