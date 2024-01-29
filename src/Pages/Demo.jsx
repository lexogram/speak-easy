/**
 * src/Pages/Demo.jsx
 */


import React, {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react'
import { Context } from '../Contexts/Context'



export const Demo = () => {
  const [ playing, setPlaying ] = useState(false)
  const { demo, setPage } = useContext(Context)
  const { video, text } = demo
  const videoRef = useRef()

  const lines = text.split("\n").map(( line, index ) => {
    if (!index) {
      return <h2 key="sound">{line}</h2>
    }
    return (<p key={`line-${index}`}>{line}</p>)
  })


  const startExercise = () => {
    videoRef.current.pause()
    setPage("Play")
  }


  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"
  const [ className, buttonText ] = playing
    ? [ "playing", "Pause" ]
    : [ "",        "Play"  ]

  const togglePlay = (on) => {
    if (typeof on !== "boolean") {
      on = !playing
    }

    if (on) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }

    setPlaying(on) 
  }


  useEffect(togglePlay, [])


  return (
    <div id="demo">
      <video
        key={video} // forces video to update
        width="320"
        ref={videoRef}
        onEnded={() => togglePlay(false)}
      >
        <source
          src={video}
          type={type}
        />
      </video>
      <button
        className={className}
        onClick={togglePlay}
      >
        {buttonText}
      </button>
      <div className="instructions">
        {lines}
      </div>
      <button
        onClick={startExercise}
      >
        Start
      </button>
    </div>
  )
}