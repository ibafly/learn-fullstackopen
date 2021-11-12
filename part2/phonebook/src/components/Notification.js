import React from "react"

const Notification = ({ message }) => {
  return !message ? null : <div className="ok-msg">{message}</div>
}

export default Notification
