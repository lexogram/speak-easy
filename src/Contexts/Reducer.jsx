/**
 * Reducer.jsx
 * 
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */


const TYPE_REGEX = /( \|)|(.*\.mp3)|(.*\.mp4)|(.*\.((png)|(jpe?g)|(gif)))/i


const initialState = {
  ready: false
}

// Will become:
// {
//   ready: true,
//   letter: "Б",
//   words: [ "бабочка", "бабушка", "балалайке", ... ],
//   word: "бабочка",
//   files: {
//     audio: "Б/бабочка/бабочка.mp3",
//     image: "Б/бабочка/бабочка.jpg",
//     video: "Б/бабочка/бабочка.mp4",
//     text: "Б/бабочка/бабочка.txt"
//   }
// }



const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "SET_DATA":
      return setData(state, payload)

    case "SET_LETTER":
      return setLetter(state, payload)

    case "SET_WORD":
    return setWord(state, payload)

    default:
      return {...state}
  }
}



function setData( state, payload ) {
  state = { ...payload, ready: true } // letterData, textMap
  const { letterData } = payload
  const wordData = Object.values(letterData)[0]
  const word = Object.keys(wordData)[0]

  return setWord(state, word)
}



function setLetter( state, letter ) {
  // Choose the first word with this letter
  const { letterData } = state
  const word = Object.keys(letterData[letter])[0]

  return setWord(state, word)
}



function setWord( state, word ) {
  const { letterData } = state

  const letter = word[0].toUpperCase()
  const words = Object.keys(letterData[letter])
  const path = `${letter}/${word}/`

  let files = letterData[letter][word]
  // files = files.reduce(( fileMap, fileName ) => {
  //     const [,text,audio,video,image] = TYPE_REGEX.exec(fileName)

  //     if (text) {
  //       fileMap.text = path + fileName
  //     } else if (audio) {
  //       fileMap.audio = path + fileName
  //     } else if (video) {
  //       fileMap.video = path + fileName
  //     } else if (image) {
  //       fileMap.image = path + fileName
  //     }

  //     return fileMap
  //   }, {})

  console.log("files :", files );
  

  return { ...state, letter, words, word, files }
}


export { reducer, initialState }
