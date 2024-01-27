/**
 * src/Contexts/FetchData.jsx
 */


import phrasesData from '../data/index.json'
const TYPE_REGEX = /(.*\.txt)|(.*\.mp3)|(.*\.mp[g4])|(.*\.((png)|(jpe?g)|(gif)))/i

const TEXT_REGEX = /^.*\.txt$/i
const WORD_REGEX = /^(\w+)\/(.+)\/(\d*-?.*)\//
const FOLDER_NAME = "phrases"




export const fetchData = async (callback) => {

  const { protocol, host } = location
  const phrasePath = `${protocol}//${host}/${FOLDER_NAME}/`

  // console.log("phrasesData:", phrasesData);

  const txts = [].concat(...Object.entries(phrasesData).map(([ language, files ]) => {
    return [].concat(...Object.entries(files).map(([letter, words]) => {
      return Object.entries(words).map(([word, files]) => {
        if (files.find) {
          const fileName = files.find( file => TEXT_REGEX.test(file))
          return `${language}/${letter}/${word}/${fileName}`
        } else {
          alert (`Can't find files for ${word}`)
        }
      })
    }))
  }))
  // console.log("txts:", txts);


  const setText = (text, index) => {
    const [ , lang, sound, folder ] = WORD_REGEX.exec(txts[index])
    const path = `${FOLDER_NAME}/${lang}/${sound}/${folder}/`

    const wordData = phrasesData[lang][sound]
    let files = wordData[folder]

    if (Array.isArray(files)) {
      // Not the second call made by StrictMode
      wordData[folder] = files.reduce(( fileMap, fileName ) => {
        const match = TYPE_REGEX.exec(fileName)
        const [,txt,audio,video,image] = match

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
    callback({ phrasesData })
  })
}