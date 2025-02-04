import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useUser } from '../../UserContext';

export default function SignInModal({ show, handleClose }) {
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData(e.target);
    const jsonData = Object.fromEntries(data);

    try {
      const res = await axiosInstance.post(`/auth/signin`, jsonData);
      if (res.status === 200) {
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
          p: 4,
          borderRadius: 2,
          width: 300,
          margin: 'auto',
          mt: '10%',
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Sign In
        </Typography>

        {errorMessage && (
          <Typography variant="body2" color="error" mb={2}>
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            name="email"
            type="email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit">
            Войти
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
