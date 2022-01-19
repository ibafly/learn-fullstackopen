import React from "react"
import { Box, Button, TextField } from "@mui/material" // TextField includes FormControl, FormHelperText, Input, InputLabel, FilledInput, OutlinedInput.

const LoginForm = ({
  usernameInputVal,
  passwordInputVal,
  usernameInputOnChange,
  passwordInputOnChange,
  formOnSubmit,
}) => (
  // <form onSubmit={formOnSubmit}>
  //   <div>
  //     <label htmlFor="username">username:</label>
  //     <input
  //       type="text"
  //       id="username"
  //       value={usernameInputVal}
  //       onChange={usernameInputOnChange}
  //     />
  //   </div>
  //   <div>
  //     <label htmlFor="password">password:</label>
  //     <input
  //       type="password"
  //       id="password"
  //       value={passwordInputVal}
  //       onChange={passwordInputOnChange}
  //     />
  //   </div>
  //   <button type="submit">login</button>
  // </form>
  <Box
    sx={{
      height: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      // justifyContent: "space-between",
    }}
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={formOnSubmit}
  >
    <TextField
      sx={{ mb: 2 }}
      label="username"
      type="text"
      id="username"
      value={usernameInputVal}
      onChange={usernameInputOnChange}
    />
    <TextField
      sx={{ mb: 2 }}
      label="password"
      type="password"
      id="password"
      value={passwordInputVal}
      onChange={passwordInputOnChange}
    />
    <Button variant="contained" type="submit">
      login
    </Button>
  </Box>
)

export default LoginForm
