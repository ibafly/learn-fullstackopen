import React from "react"
import { Link } from "react-router-dom"

const Header = ({ user, opAfterLogoutBtnOnClick }) => {
  const style = {
    background: "gray",
  }
  return (
    <div>
      <div style={style}>
        <Link to="/blogs">blogs</Link>&nbsp;
        <Link to="/users">users</Link>&nbsp;
        {user && (
          <span>
            {user.name} logged in
            <button onClick={opAfterLogoutBtnOnClick}>logout</button>
          </span>
        )}
      </div>
      <h2>blogs</h2>
    </div>
  )
}

export default Header
