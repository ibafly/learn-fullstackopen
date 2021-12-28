import React, { useState, useImperativeHandle } from "react"

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
      <button onClick={toggleVisibility} style={hideWhenVisible}>
        {btnLabel}
      </button>
      <div style={showWhenVisible}>{children}</div>
    </div>
  )
})

export default Togglable
