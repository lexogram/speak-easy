/**
 * src/Contexts/FetchData.jsx
 *
 * Reads the contents of src/assets/index.json
 * Generates relative URLs for all images and recordings
 * Replaces .txt file names with the contents of the files
 *
 * Calls the callback with an object with the format:
 *
 * { "uk": {
 *     "b": {
 *       "--demo--": {
 *         video: <relative URL>,
 *         text: <string>
 *       },
 *     "01-bee": {
 *       audio: <relative URL>,
 *       video: <relative URL>,
 *       image: <relative URL>,
 *       text:  <string>
 *     }, ...
 *   }, ...
 *   "ru": { ... }
 * }
 */


import phrasesData from '../assets/index.json'
const TYPE_REGEX = /(.*\.txt)|(.*\.mp3)|(.*\.m(?:p[g4])|(?:4v))|(.*\.((png)|(jpe?g)|(gif)))/i

const TEXT_REGEX = /^.*\.txt$/i
const WORD_REGEX = /^(\w+)\/(.+)\/(\d*-?.*)\//
const FOLDER_NAME = "speak-easy/phrases"



export const fetchData = async (callback) => {

  const { protocol, host } = location
  const phrasePath = `${protocol}//${host}/${FOLDER_NAME}/`


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


  const setText = (text, index) => {
    const [ , lang, sound, folder ] = WORD_REGEX.exec(txts[index])
    const path = `/${FOLDER_NAME}/${lang}/${sound}/${folder}/`

    const wordData = phrasesData[lang][sound]
    let files = wordData[folder]

    if (Array.isArray(files)) {
      // Not the second call made by StrictMode, by which time
      // files will have become an object with the format:
      // { audio, video, image, text }
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