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
//   language: "ru"
//   sound: "Б",
//   words: [ "бабочка", "бабушка", "балалайке", ... ],
//   word: "бабочка",
//   files: {
//     audio: "ru/Б/бабочка/бабочка.mp3",
//     image: "ru/Б/бабочка/бабочка.jpg",
//     video: "ru/Б/бабочка/бабочка.mp4",
//     text:  "ru/Б/бабочка/бабочка.txt"
//   }
// }



const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case "SET_DATA":
      return setData(state, payload)

    case "SET_LANGUAGE":
      return setLanguage(state, payload)

    case "SET_SOUND":
      return setSound(state, payload)

    case "SET_WORD":
      return setWord(state, payload)

    case "SHOW_NEXT":
      return showNext(state)

    default:
      return {...state}
  }
}



function setData( state, payload ) {
  const { phrasesData } = payload
  const language = Object.keys(phrasesData)[0]
  state = { phrasesData, ready: true }

  return setLanguage( state, language )
}



function setLanguage( state, language ) {
  const { phrasesData } = state
  const languageData = phrasesData[language]
  state = { ...state, languageData }

  // Choose the first word of the first sound in this language
  const wordData = Object.values(languageData)[0]
  const word = Object.keys(wordData)[0]

  return setWord(state, word)
}



function setSound( state, sound ) {
  // Choose the first word with this sound
  const { phrasesData } = state
  const word = Object.keys(phrasesData[sound])[0]

  return setWord(state, word)
}



function setWord( state, word ) {
  const { languageData } = state
  // { "б": { "бабочка": [ ... ]}}
  // OR
  // { "b": { "01-bee": [ ... ]}}

  const [ sound ] = Object.entries(languageData).find(
    ([ key, value ]) => {
      const words = Object.keys(value)
      if (words.indexOf(word) < 0) {
        return false
      }

      return true
    }
  )
  const words = Object.keys(languageData[sound])

  let files = languageData[sound][word]

  return { ...state, sound, words, word, files }
}


const showNext = (state) => {
  let { words, word } = state
  const index = (words.indexOf(word) + 1) % words.length
  word = words[index]

  return setWord(state, word)
}


export { reducer, initialState }
