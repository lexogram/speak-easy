/**
 * src/Pages/index.jsx
 */


import React, { useContext } from 'react'
import { Context } from '../Contexts/Context'

// import { Language } from "./Components/Language"
import { Welcome } from "./Welcome"
import { Choose } from "./Choose"
import { Demo } from "./Demo"
import { Play } from "./Play"
import { Settings } from "./Settings"
import { Menu } from "../Menu"

const pages = {
  Welcome,
  Choose,
  Demo,
  Play,
  Settings
}


export const Pages = () => {
  const { page, setPage } = useContext(Context)

  const Page = pages[page]

  return (
    <>
      <Page setPage={setPage}/>
      <Menu/>
    </>
  )
}