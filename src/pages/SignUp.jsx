import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, } from '@mui/material';
import axios from 'axios';
import apiUrl from '../../api'
import { Link as Anchor } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      Email: email,
      Password: password
    }
    console.log(data)
    axios.post(apiUrl + "api/signupusers/register", data)
      .then(res => {
        console.log(res.data)
        navigate("/")
      })
      .catch(err => {
        setErrorMessage(err.response.data)
        console.log(err)
      })

  }
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
        <Typography variant="h5">Register User</Typography>
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
            Register
          </Button>
          {errorMessage && (
            <Typography variant="body2" color="red" align="center">
              {errorMessage}
            </Typography>
          )}
          <Typography variant="body2" align="center">
            <Anchor to='/' className=' text-cyan-700'>
              Login
            </Anchor>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
export default SignUp