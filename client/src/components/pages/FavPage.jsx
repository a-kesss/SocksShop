import { useEffect, useState } from 'react';
import React from 'react';
import { useUser } from '../../UserContext';
import axiosInstance from '../../axiosInstance';
import SockBox from '../ui/Socks/SockBox';
import { Alert, Container, Grid2 } from '@mui/material';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';

export default function FavPage() {
  const [fav, setFav] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/socks/likes/${user.id}`).then((res) => {
        setFav(res.data.map((like) => like.Sock));
      });
    }
  }, [user]);

  const handleDelete = (sockId) => {
    axiosInstance
      .delete(`/socks/likes/${user.id}/${sockId}`)
      .then(() => {
        setFav((prevFav) => prevFav.filter((sock) => sock.id !== sockId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении из избранного:', error);
      });
  };

  const handleClick = () => {
    navigator.clipboard.writeText('TEXT');
  };

  if (fav.length === 0) {
    return (
      <Container
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'Center',
        }}
      >
        <Alert color='primary' variant="filled" sx={{ width: '20%' }} severity="info">
          У вас нет избранных носков... :(
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '80vh',
        padding: 4,
      }}
    >
      <Grid2 container spacing={4} justifyContent="center">
        {fav.map((sock) => (
          <Grid2 item xs={12} sm={4} key={sock.id}>
            <Box position="relative">
              <SockBox
                color={sock.color}
                pattern={sock.pattern}
                patternColor={sock.patternColor}
                picture={sock.picture}
                size={250}
              />
              <IconButton
                onClick={() => handleDelete(sock.id)}
                color="error"
                aria-label="delete"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 30,
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
