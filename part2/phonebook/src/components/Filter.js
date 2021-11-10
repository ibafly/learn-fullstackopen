import React from "react"

const Filter = ({ inputType, inputVal, inputOnChange }) => {
  return (
    <div>
      filter shown with:
      <input type={inputType} value={inputVal} onChange={inputOnChange} />
    </div>
  )
}

export default Filter
