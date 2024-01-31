/**
 * SelectSlider.jsx
 */


import React, { useRef, useEffect, useState } from "react"

export const SelectSlider = ({
  stringMap,
  value,
  action
}) => {
  const values = Object.keys(stringMap)
  const range = values.length - 1
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ thumbLeft, setThumbLeft ] = useState(-100) // offscreen


  const triggerAction = ({ type, target }) => {
    action(target.value)
  }


  const getStep = (ratio) => {
    if (ratio) {
      return Math.floor(range * ratio)
    }
  
    return values.findIndex( number => number == value) 
  }


  const placeThumb = (offsetX) => {
    // Get the widths of the range element and the thumb
    const ranger = rangeRef.current
    const thumb = thumbRef.current
    const rangeWidth = parseFloat(
      getComputedStyle(ranger).getPropertyValue("width")
    ) // excludes border and padding
    const { width: thumbWidth } = thumb.getBoundingClientRect()

    // Find which fraction of the range width represents 100% of
    // the thumb movement
    const maxScroll = rangeWidth - thumbWidth
    const step = getStep(offsetX / maxScroll)
    const fraction = step / range
    // setFraction(fraction)

    const thumbLeft = fraction * maxScroll
    setThumbLeft(thumbLeft)

    if ( offsetX !== undefined ) {
      action(values[step])
    }
  }


  const rangeStyle = {
    textAlign: "left",
  }


  const thumbStyle = {
    position: "relative",
    left: `${thumbLeft}px`
  }



  const checkKey = event => {

  }



  /**
   * Called when the user updates the number input directly
   *
   */
  const updateValue = event => {
    // setFraction(event.target.value)
    // onDrag(id, fraction)
  }


  const startDrag = ({ target, clientX }) => {
    const ranger = rangeRef.current
    const { left } = ranger.getBoundingClientRect()

    if (target.classList.contains("range")) {
      placeThumb(clientX - left)
    }

    document.body.addEventListener("mousemove", drag)
    document.body.addEventListener("mouseup", stopDrag)


    function drag(event) {
      const offsetX = event.clientX - left
      placeThumb(offsetX)
    }


    function stopDrag() {
      document.body.removeEventListener("mousemove", drag)
      document.body.removeEventListener("mouseup", stopDrag)
    }
  }


  const options = Object.entries(stringMap)
    .map(([ value, string ]) => (
      <option
        key={value}
        value={value}
      >
        {string}
      </option>
    ))


  useEffect(placeThumb, [value])


  return (
    <div className="select-slider">
      <select
        value={value}
        onChange={triggerAction}
      >
        {options}
      </select>

      <div
        className="range"
        style={rangeStyle}
        onMouseDown={startDrag}
        ref={rangeRef}
      >
        <div
          className="thumb"
          style={thumbStyle}
          ref={thumbRef}
        ></div>
      </div>
    </div>
  )
}