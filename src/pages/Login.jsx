//import React from 'react'
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, } from '@mui/material';
import axios from 'axios';
import apiUrl from '../../api'
import { useNavigate } from 'react-router-dom';
import { Link as Anchor } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      Email: email,
      Password: password
    }
    console.log(data)
    axios.post(apiUrl + "api/login/login", data)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
        navigate("/home")
      })
      .catch(err => {
        console.log(err.response.data)
        setErrorMessage(err.response.data)
      })

  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="red" align="center">
              {errorMessage}
            </Typography>
          )}
          <Typography variant="body2" align="center">
            ¿Don't have an account??{' '}
            <Anchor to='/signup' className=' text-cyan-700'>
              Register here
            </Anchor>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
export default Login