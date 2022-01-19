import React from "react"

import { Input as InputMui } from "@mui/material"

const Input = ({ name, type, value, onChange }) => {
  return <InputMui name={name} type={type} value={value} onChange={onChange} />
}

export default Input
