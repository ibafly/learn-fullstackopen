import React from "react"

const Notification = ({ message }) => {
  return message ? <p>{message}</p> : null
}

export default Notification
