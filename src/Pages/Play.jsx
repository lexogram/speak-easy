/**
 * src/Pages/Play.jsx
 */


import React, { useContext, useRef } from 'react'
import { Context } from '../Contexts/Context'


const CUE_REGEX = /(.*)\|(.*)([.!?])?/
const CUE_DELAY = 1000
const RECORD_DURATION = 2000


export const Play = () => {
  const {
    ready,
    files,
    startRecording,
    stopRecording
  } = useContext(Context)  
  
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


  return (
    <div
      id="play"
      onClick={playAudio}
    >
      <audio
        src={audio}
        ref={audioRef}
        onEnded={prepareVideo}
        style={{ display: "none" }}
      />
      <video
        width="320"
        ref={videoRef}
        onEnded={beginRecording}
      >
       <source
        src={video}
        type="video/mp4"
        />
      </video>
      <p>
        <span className="prompt">{prompt}</span>
        <span className="cue">{cue}</span>
        <span>{mark}</span>
      </p>
    </div>
  )
}