/**
 * src/Contexts/FetchData.jsx
 */


import letterData from '../data/index.json'
const TYPE_REGEX = /(.*\.txt)|(.*\.mp3)|(.*\.mp4)|(.*\.((png)|(jpe?g)|(gif)))/i
const FOLDER_NAME = "/phrases"




export const fetchData = async (callback) => {
  
  const { protocol, host } = location
  const phrasePath = `${protocol}//${host}/phrases/`

  // console.log("letterData:", letterData);
  const textRegex = /^.*\.txt$/i
  const wordRegex = /\/(.*)\//

  // Create an array of all the paths to the .txt files
  const txts = [].concat(...Object.entries(letterData).map(([letter, words]) => {
    return Object.entries(words).map(([word, files]) => {
      if (files.find) {
        const fileName = files.find( file => textRegex.test(file))
        return `${letter}/${word}/${fileName}`
      } else {
        alert (`Can't find files for ${word}`)
      }
    })
  }))
  // console.log("txts:", txts);


  const setText = (text, index) => {
    const word = wordRegex.exec(txts[index])[1]
    const lower = word.toLowerCase()
    // <<< QUIRKAROUND for Russian letters with diacritics being
    // treated as two characters
    const letter = (lower.charAt(0) === "ё")
      ? "Ё"
      : (
          lower.charAt(0) === "й"
       || lower.charAt(0) === "и" && lower.charAt(1) === "̆" 
        )
        ? "Й"
        : word[0].toUpperCase()
    // STILL NOT RESOLVED >>>
    const path = `${FOLDER_NAME}/${letter}/${word}/`

    const wordData = letterData[letter]
    let files = wordData[word]

    if (Array.isArray(files)) {
      // Not the second call made by StrictMode
      wordData[word] = files.reduce(( fileMap, fileName ) => {
        const [,txt,audio,video,image] = TYPE_REGEX.exec(fileName)

        if (txt) {
          fileMap.text = text
        } else if (audio) {
          fileMap.audio = path + fileName
        } else if (video) {
          fileMap.video = path + fileName
        } else if (image) {
          fileMap.image = path + fileName
        }

        return fileMap
      }, {})
    }
  }


  const promises = txts.map(( filePath, index ) => (  
    fetch(phrasePath + filePath)
    .then(response => response.text())
    .then(text => setText(text, index))
  ))

  Promise.all(promises).then(() => {    
    callback({ letterData })
  })
}