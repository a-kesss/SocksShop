import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useUser } from '../../UserContext';

export default function SignUpModal({ show, handleClose }) {
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await axiosInstance.post(`/auth/signup`, data);
      if (res.status === 201) {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        setErrorMessage('');
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 300,
          margin: 'auto',
          mt: '10%',
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Sign Up
        </Typography>

        {errorMessage && (
          <Typography variant="body2" color="error" mb={2}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            placeholder="Enter username"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="Enter email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            fullWidth
            required
            margin="normal"
          />
          <div style={{ marginTop: 20 }}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
