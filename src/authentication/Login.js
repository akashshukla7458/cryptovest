import {Box, Button, TextField } from '@material-ui/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { CryptoState } from '../CryptoContext'
import { useState } from 'react';
import {auth} from "../firebase"


const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();


  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the field",
        type: "error"
      })
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      })
      handleClose();

    }
    catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error"
      })
      return;
    }
  }

  return (
    <Box
      p={3}
      style={{
        display: "flex", flexDirection: "column", gap: "20px",
      }}
    >
      <TextField
        variant="outlined" type="email" style={{marginTop:"20px"}} label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth
      >
      </TextField>


      <TextField variant="outlined" type="password" label="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth>

      </TextField>

      <Button
        vairant="contained" size="large" onClick={handleSubmit} style={{ backgroundColor: "#3dbfb0" }}>
        Login
      </Button>

    </Box>
  )
}

export default Login