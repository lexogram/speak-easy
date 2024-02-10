/**
 * src/Pages/Play/Recorder.js
 */


export const getMediaRecorder = (callback) => {
  navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(onSuccess, onError);

  function onSuccess(stream) {
    // Use webm audio if possible...
    let mimeType = "audio/webm"
    if ( !("MediaSource" in window)
      || !MediaSource.isTypeSupported(mimeType)
       ) {
        // ... otherwise let the browser choose the audio format
        mimeType = ""
      }

    const mediaRecorder = new MediaRecorder(stream) //, {mimeType})
    callback(null, mediaRecorder)
  }

  function onError(error) {
    callback(`An error occured with getUserMedia():
      ${error}`);
  }
}