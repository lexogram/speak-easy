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
import { startRecording, stopRecording } from './Recorder'
import { getDateTime } from '../../Utilities/dateTime'


const CUE_REGEX = /(.*)\|\s*([^.!?]*)([.!?])?/
let timeOut
let lastWord


export const Play = () => {
  const {
    mimeType,
    sound,
    word,
    files,
    showNext,
    step,
    setStep,
    autoRun,
    cueDelay, // pause between prompt audio and cue video
    duration, // duration of the audio recording
    pause,    // pause between end of listen & next word prompt
    showVideo,
    silentVideo,
    goToPage
  } = useContext(Context)

  lastWord = word

  const audioRef = useRef()
  const videoRef = useRef()

  const [ saveAs, setSaveAs ] = useState()

  const { text, audio, video, image } = (files || {})
  const [ , prompt, cue, mark ] = text
    ? CUE_REGEX.exec(text)
    : []


  const playPrompt = () => {
    audioRef.current.src = audio
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


  /**
   * recordingCallback() should be called twice for each time
   * startRecording() is called.
   * - Once when the UserMedia audio stream is ready for the
   *   recording to begin, in which case `startTime` will be a
   *   date object (which is in fact ignored)
   * - A second time shortly after stopRecording() was called,
   *   when the saveRecording() listener for the `stop` event
   *   has finished processing the recorded audio. In this case,
   *   `src` will contain a blob URL which can be assigned to
   *   an Audio object and played back and saved to a file either
   *   locally or on a remote server.
   */
  const recordingCallback = (error, { startTime, src }) => {
    if (error) {
      return alert(`ERROR: ${error}`)
    }

    if (startTime) {
      console.log("recordingStarted")
      if (isNaN(duration)) {
        // Wait for a click on Stop Recording
      } else {
        timeOut = setTimeout(endRecording, duration)
      }

    } else if (src) {
      console.log("recording saved")
      const { date, time, now } = getDateTime()

      const user = "_id"
      const saveAs = {
        user,
        sound,
        word,
        date: now,
        src, // should be a blob url
        url: `${user}/${date}/${sound}/${word}-${time}.webm`
      }
      setSaveAs(saveAs)

      console.log(`setSaveAs(${saveAs})`);

      playBack(src)
    }
  }


  const beginRecording = ({ type }) => {
    if (autoRun || type === "click") {
      // startRecording is asynchronous. The recordingCallback()
      // callback will be called when the promise for
      // navigator.mediaDevices.getUserMedia() is resolved and
      // again, later, when the recording has been saved.
      startRecording(mimeType, recordingCallback)
      setStep("record")

    } else {
      setStep("canRecord")
    }
  }


  const endRecording = () => {
    clearTimeout(timeOut)
    console.log("endRecording")
    stopRecording()
    // stopRecording is asynchronous. The recordingCallback()
    // function will be called with a `src` audio URL when the
    // recording has been saved.
  }


  const playBack = (srcOrClickEvent) => {
    if (srcOrClickEvent.type === "click" && step === "listen") {
      // The user clicked on the Listen button
      audioRef.current.play()

    } else {
      // srcOrClickEvent is a blob audio url
      const audio = audioRef.current
      audio.src = srcOrClickEvent
      setStep("listen")

      if (autoRun) {
        audio.play()
      }
    }

    console.log("audioRef.current.src:", audioRef.current.src);
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


  const audioEnded = step === "play"
    ? prepareVideo
    : nextWord


  return (
    <div
      id="play"
    >
      <h1>{sound}</h1>
      { image && <img src={image} alt={cue} /> }
      <audio
        src={audio}
        ref={audioRef}
        onEnded={audioEnded}
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