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
import { Success } from "./Success"
import { Settings } from "./Settings"
import { Menu } from "../Menu"

const pages = {
  Welcome,
  Choose,
  Demo,
  Play,
  Success,
  Settings
}


export const Pages = () => {
  const { page, goToPage, sound, ready } = useContext(Context)

  const Page = pages[page]

  return (
    <>
      <Page goToPage={goToPage} ready={ready}/>
      <Menu/>
    </>
  )
}