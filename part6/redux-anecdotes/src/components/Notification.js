import React from "react"
//import { useSelector } from "react-redux"
import { connect } from "react-redux"

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  }
  //  const notification = useSelector(state => state.notification)

  return props.notification ? (
    <div style={style}>{props.notification}</div>
  ) : null
}

const mapStateToProps = state => {
  return { notification: state.notification }
}
const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification
