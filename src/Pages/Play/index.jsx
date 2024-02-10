/**
 * src/Pages/Play.jsx
 */


import React, {
  useContext,
  useRef,
  useEffect,
  useState
} from 'react'
import { Context } from '../../Contexts/Context'
import { Buttons } from './Buttons'
import { getMediaRecorder } from './Recorder'
import { getDateTime } from '../../Utilities/dateTime'


const CUE_REGEX = /(.*)\|\s*([^.!?]*)([.!?])?/
let timeOut
let lastWord


export const Play = () => {
  const {
    sound,
    word,
    files,
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
  const stopRef = useRef(() => { console.log("stub")})
  const stopRecording = stopRef.current

  const [ saveAs, setSaveAs ] = useState()
  const [ render, setRender ] = useState(0)

  console.log("render:", render, "step", step)
  console.log("saveAs:", saveAs);



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


  const setRecorder = (error, mediaRecorder) => {
    if (error) {
      return alert(error)
    }

    const saveRecording = () => {
      console.log("saveRecording called")
      const type = mediaRecorder.mimeType
      const blob = new Blob(chunks, { type })
      const src = window.URL.createObjectURL(blob)

      const { date, time, now } = getDateTime()
      const user = "_id"
      const saveAs = {
        user,
        sound,
        word,
        date: now,
        src,
        url: `${user}/${date}/${sound}/${word}-${time}.webm`
      }
      setSaveAs(saveAs)

      console.log("render:", render, ", saveAs:", saveAs);

      setStep("listen")
    }

    const chunks = []
    mediaRecorder.onstop = saveRecording

    mediaRecorder.ondataavailable = ({data}) => {
      chunks.push(data);
      console.log("pushing data")
    };

    const stopRecording = stopRef.current = () => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop()
        console.log("media recorder stopped")
      }
    }

    setTimeout(stopRecording, duration)

    mediaRecorder.start()
    setStep("record")
  }


  // const treatRecording = (error, { stopRecording, blob }) => {
  //   if (error) {
  //     return alert(error)
  //   }

  //   if (stopRecording) {
  //     stopRef.current = stopRecording
  //     timeOut = setTimeout(endRecording, duration)
  //     setStep("record")

  //   } else if (blob) {
  //     saveAs.src = blob
  //   }
  // }


  const beginRecording = ({ type }) => {
    if (autoRun || type === "click") {
      getMediaRecorder(setRecorder)

    } else {
      setStep("canRecord")
    }
  }


  const endRecording = () => {
    stopRecording()
    // timeOut = setTimeout(nextWord, duration)
    console.log("saveAs:", saveAs);

    setStep("listen")
  }

  // const audioURL = window.URL.createObjectURL(blob)
  // audio.src = audioURL
  // console.log("recording saved")
  // audio.play()

  const playBack = () => {
    if (step !== "listen") {
      return
    }

    const { src } = (saveAs || {})
    console.log("render:", render, ", playback src:", src);

    if (src) {
      const audio = new Audio()
      audio.src = src
      audio.play()

      if (autoRun) {
        timeOut = setTimeout(nextWord, audio.duration)
      }

    } else {
      alert("no sound to play")
      console.log("playBack saveAs:", saveAs);
    }
  }


  const nextWord = () => {
    setStep("next")
    if (autoRun) {
      timeOut = setTimeout(showNext, pause)
    }
  }


  const cleanUp = () => {
    stopRecording && stopRecording()
    // no error if no recording in progress
    audioRef.current && audioRef.current.pause()
    videoRef.current && videoRef.current.pause()
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
  useEffect(() => setRender(render + 1), [step])
  useEffect(playBack, [step === "listen"])


  const type = video.match(/\.mpg$/i) ? "video/mpeg" : "video/mp4"

  const listeners = {
    beginRecording,
    endRecording,
    playBack,
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