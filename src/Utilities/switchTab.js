const FADE_DELAY = 500
const mediaElementSet = new Set()


const toggleActive = ({ type }) => {
  if (type === "blur") {
    fadeOutAndPause()
  } else {
    resetVolume()
  }
}



window.addEventListener("blur", toggleActive, false)
window.addEventListener("focus", toggleActive, false)



function fadeOutAndPause() {
  mediaElementArray.forEach(
    element => {}
  )
}


function resetVolume() {

}



export const addElementsToMute = mediaElementArray => {
  mediaElementArray.forEach(
    element => mediaElementSet.add(element)
  )
}



export const removeElementsToMute = mediaElementArray => {
  mediaElementArray.forEach(
    element => mediaElementSet.delete(element)
  )
}