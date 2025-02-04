import { Alert, Container } from '@mui/material';
import React from 'react';

export default function PageNotFound() {
  return (
    <Container
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'Center',
      }}
    >
      <Alert color="primary" variant="filled" sx={{ width: '20%' }} severity="info">
        Такой страницы не существует, вернитесь на главную страницу
      </Alert>
    </Container>
  );
}
