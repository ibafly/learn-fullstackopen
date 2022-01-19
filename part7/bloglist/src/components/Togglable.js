import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

import { Button } from "@mui/material"

const Togglable = React.forwardRef(({ children, btnLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility } // return an object not a function variable
  })

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleVisibility}
        style={hideWhenVisible}
      >
        {btnLabel}
      </Button>
      <div style={showWhenVisible}>{children}</div>
    </div>
  )
})

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
