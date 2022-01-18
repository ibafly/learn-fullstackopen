import React from "react"

const Input = ({ name, type, value, onChange }) => {
  return <input name={name} type={type} value={value} onChange={onChange} />
}

export default Input
