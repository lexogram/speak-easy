/**
 * src/Pages/Recordings.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../../Contexts/Context'


export const Recordings = () => {
  const recordings = useContext(Context).recordings || {}
  // {
  //   <date>: {
  //     <string sound>: {
  //       <string cue word>: <url>,
  //       ...
  //     },
  //     ...
  //   },
  //   ...
  // }


  return (
    <h1>Recordings goes here</h1>
  )
}