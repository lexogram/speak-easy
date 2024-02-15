/**
 * src/Pages/Play/Recorder.js
 */

// Variables to hold the arguments sent to startRecording() in
// the scope of this script
let callBack
let mimeType

// Variables used in the scope of this script
let mediaRecorder

const streams = []
const chunks = []



export const startRecording = (...args) => {
  ([ mimeType, callBack ] = args )

  console.log("startRecording mimeType:", mimeType);

  navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(onSuccess, onError);
}


function onSuccess(stream) {
  streams.push(stream)
  mediaRecorder = new MediaRecorder(stream, { mimeType })

  mediaRecorder.ondataavailable = ({data}) => {
    chunks.push(data);
  };
  mediaRecorder.onstop = saveRecording

  mediaRecorder.start()
  const startTime = new Date()
  // On Firefox, recording won't start for about 1.3 seconds

  callBack(null, { startTime } ) // no error
}


function onError(error) {
  callBack(`An error occured with getUserMedia():
    ${error}`);
}


export function stopRecording() {
  if (!mediaRecorder) {
    return
  }

  mediaRecorder.stop()
  console.log("mediaRecorder.stopped")
  // stop() is an asynchronous process. You can't save the
  // recording until it is complete, when the onstop event
  // will fire and trigger the saveRecording() listener.
  stopAllTracks()
}


function stopAllTracks() {
  // The System "recording" icon will not be switched off until
  // all the streams in use have been stopped.
  streams.forEach( stream => {
    stream.getTracks() // get all tracks from the MediaStream
      .forEach( track => track.stop() ); // stop each of them
  })
  streams.length = 0
  console.log("tracks stopped")
}


function saveRecording() {
  console.log("saveRecording")
  const type = mediaRecorder.mimeType
  console.log("saveRecording type:", type);

  const blob = new Blob(chunks, { type })
  const src = window.URL.createObjectURL(blob)
  chunks.length = [] // ready for the next recording

  callBack( null, { src })
}


