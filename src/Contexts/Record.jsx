/**
 * src/Contexts/Record.jsx
 */

export const getRecorder = async(callback, audio) => {
  if (navigator.mediaDevices.getUserMedia) {
    // console.log("The mediaDevices.getUserMedia() method is supported.");

    const constraints = { audio: true };
    let chunks = [];

    let onSuccess = function (stream) {
      const mediaRecorder = new MediaRecorder(stream);

      const startRecording = () => {
        mediaRecorder.start()
        console.log("mediaRecorder started")
      }

      mediaRecorder.ondataavailable = event => {
        chunks.push(event.data);
        console.log("pushing chunk")
      };

      const stopRecording = () => {
        mediaRecorder.stop()
        console.log("media recorder stopped")
      }

      const saveRecording = () => {
        console.log("saveRecording called");

        const type = mediaRecorder.mimeType
        const blob = new Blob(chunks, { type })
        chunks = [] // for next time
        const audioURL = window.URL.createObjectURL(blob)
        audio.src = audioURL
        console.log("recording saved")
        audio.play()
        console.log("audio played?")
      }

      mediaRecorder.onstop = saveRecording

      callback(null, {
        startRecording,
        stopRecording,
        playback: audio
      })
    };

    let onError = function (error) {
      callback(`An error occured with getUserMedia():
       ${error}`);
    };

    navigator.mediaDevices
    .getUserMedia(constraints)
    .then(onSuccess, onError);

  } else {
    callback("MediaDevices.getUserMedia() not supported on your browser!")
  }
}