/**
 * SelectSlider.jsx
 */


import React, { useRef, useEffect, useState } from "react"



export const SelectSlider = ({
  title,
  stringMap,
  value,
  action,
  className
}) => {
  const values = Object.keys(stringMap)
  const range = values.length - 1
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ thumbStyle, setThumbStyle ] = useState({
    position: "relative",
    left: 0,
    width: "2em"
  }) // offscreen


  const triggerAction = ({ target }) => {
    action(target.value)
  }


  const getStep = (ratio) => {
    if (ratio) {
      return Math.floor(range * Math.max(0, Math.min(ratio, 1)))
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
    const width = rangeWidth / (range + 1)

    const maxScroll = rangeWidth - width
    const step = getStep(offsetX / maxScroll)
    const fraction = step / range

    const left = fraction * maxScroll
    setThumbStyle({ ...thumbStyle, left, width })

    if ( offsetX !== undefined ) {
      action(values[step])
    }
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
      placeThumb(event.clientX - left)
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


  className = `select-slider ${className ? className : ""}`


  useEffect(placeThumb, [value, range])


  return (
    <div className={className}>
      <span>{title}</span>
      <div className="value">
        <div
          className="range"
          onMouseDown={startDrag}
          ref={rangeRef}
        >
          <div
            className="thumb"
            style={thumbStyle}
            ref={thumbRef}
          ></div>
        </div>
        <select
          value={value}
          onChange={triggerAction}
        >
          {options}
        </select>
      </div>
    </div>
  )
}