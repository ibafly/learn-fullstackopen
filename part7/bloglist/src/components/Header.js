import React from "react"

const Header = ({ user, opAfterLogoutBtnOnClick }) => {
  return (
    <div>
      <h2>blogs</h2>
      {user && (
        <div>
          {user.name} logged in <br />
          <button onClick={opAfterLogoutBtnOnClick}>logout</button>
        </div>
      )}
    </div>
  )
}

export default Header
