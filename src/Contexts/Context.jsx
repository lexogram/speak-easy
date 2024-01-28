/**
 * Context.jsx
 * description
 */

import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useRef
} from 'react'
import { reducer, initialState } from './Reducer'
import { fetchData } from './FetchData'
import { getRecorder } from './Record'

export const Context = createContext()



export const Provider = ({ children }) => {
  const startRef = useRef()
  const stopRef = useRef()
  const playRef = useRef()
  const [ step, setStep ] = useState()
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    ready,
    sound,
    words,
    word,
    files
  } = state

  const startRecording = startRef.current
  const stopRecording = stopRef.current
  const playback = playRef.current


  const recorderCallback = ( error, controls ) => {
    if (error) {
      // TODO: Warn the user that recording won't work
      alert(error)
      return
    }

    const { startRecording, stopRecording, playback } = controls

    startRef.current = startRecording
    stopRef.current = stopRecording
    playRef.current = playback
  }




  const initializeReducer = payload => {
    const action = {
      type: "SET_DATA",
      payload
    }

    dispatch(action)
  }


  const setLanguage = payload => {
    const action = {
      type: "SET_LANGUAGE",
      payload
    }

    dispatch(action)
  }


  const setSound = payload => {
    const action = {
      type: "SET_SOUND",
      payload
    }

    dispatch(action)
  }


  const setWord = payload => {
    const action = {
      type: "SET_WORD",
      payload
    }

    dispatch(action)
  }


  const showNext = () => {
    const action = {
      type: "SHOW_NEXT"
    }

    dispatch(action)
  }


  useEffect(() => { fetchData(initializeReducer) }, [])
  useEffect(() => { getRecorder(recorderCallback, new Audio()) }, [])


  return (
    <Context.Provider
      value ={{
        ready,

        startRecording,
        stopRecording,
        playback,

        sound,
        words,
        word,
        files,

        setLanguage,
        setSound,
        setWord,
        showNext,

        step,
        setStep
      }}
    >
      {children}
    </Context.Provider>
  )
}