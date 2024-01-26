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

    case "SHOW_NEXT":
      return showNext(state)

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

  let files = letterData[letter][word]

  return { ...state, letter, words, word, files }
}


const showNext = (state) => {
  let { words, word } = state
  const index = (words.indexOf(word) + 1) % words.length
  word = words[index]

  return setWord(state, word)
}


export { reducer, initialState }
