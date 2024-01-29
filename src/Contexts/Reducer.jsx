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
//   sounds: [ "Б", "В", "Г", ... ]
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
  const language = Object.keys(phrasesData)[1]
  state = { phrasesData, ready: true }

  return setLanguage( state, language )
}



function setLanguage( state, language ) {
  const { phrasesData } = state
  const languageData = phrasesData[language]
  const sounds = Object.keys(languageData)
  state = { ...state, language, languageData, sounds }

  // // Choose the first word of the first sound in this language
  // const wordData = Object.values(languageData)[0]
  // const word = Object.keys(wordData)[0]

  // return setWord(state, word)
  return { ...state }
}



function setSound( state, sound ) {
  // Choose the first word with this sound
  const { languageData } = state
  const soundData = languageData[sound]

  state.demo = soundData.__demo__

  const word = Object.keys(soundData)[0]

  return setWord(state, word)
}



function setWord( state, word ) {
  if (typeof word !== "string") {
    debugger
  }
  const { languageData } = state
  // { "б": { "бабочка": [ ... ]}}
  // OR
  // { "b": { "01-bee": [ ... ]}}

  const sounds = Object.entries(languageData)
  // console.log("sounds:", sounds);
  // console.log("sounds.find:", sounds.find);
  // console.log("Array.isArray(sounds):", Array.isArray(sounds));

  const [ sound ] = sounds.find(
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

  // Special case: skip the demo. It's not a word to practise.
  word = words[index]
  if (word === "__demo__") {
    word = words[index + 1] || words[0]
  }

  return setWord(state, word)
}


export { reducer, initialState }
