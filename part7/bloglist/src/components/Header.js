import React from "react"
import { Link } from "react-router-dom"

import { Box, Button } from "@mui/material"

const Header = ({ user, opAfterLogoutBtnOnClick }) => {
  //   const style = {
  //     background: "gray",
  //   }
  return (
    <Box
      sx={{
        w: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box component="span" sx={{}}>
        <Button>
          <Link to="/">blogs</Link>&nbsp;
        </Button>
        <Button>
          <Link to="/users">users</Link>&nbsp;
        </Button>
      </Box>
      {user && (
        <Box component="span" sx={{}}>
          <strong>{user.name}</strong> logged in
          <Button
            sx={{ ml: 1 }}
            size="small"
            variant="outlined"
            onClick={opAfterLogoutBtnOnClick}
          >
            logout
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Header
