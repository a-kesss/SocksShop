import React from 'react';
import SocksCard from '../ui/SocksCard';
import axiosInstance from '../../axiosInstance';
import { useState, useEffect } from 'react';
import { Alert, Box, Container } from '@mui/material';
import { useUser } from '../../UserContext';

export default function AllSocksPage() {
  const [fav, setFav] = useState([]);
  const [socks, setSocks] = useState([]);
  const [carts, setCart] = useState([]);
  const { user } = useUser();

  const getSocks = async () => {
    const response = await axiosInstance.get('/socks/');
    setSocks(response.data);
  };

  const getCart = async () => {
    if (user) {
      axiosInstance.get(`/socks/carts/${user.id}`).then((res) => {
        setCart(res.data.map((cart) => cart.Sock));
      });
    }
  };

  const getFav = async () => {
    if (user) {
      axiosInstance.get(`/socks/likes/${user.id}`).then((res) => {
        setFav(res.data.map((like) => like.Sock));
      });
    }
  };

  useEffect(() => {
    getSocks();
    getCart();
    getFav();
  }, [user]);

  if (socks.length > 0)
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        {socks.map((sock) => (
          <SocksCard fav={fav} carts={carts} key={sock.id} sock={sock} />
        ))}
      </Box>
    );

  return (
    <Container
      sx={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'Center',
      }}
    >
      <Alert color="primary" variant="filled" sx={{ width: '30%' }} severity="info">
        Загрузка... Пожалуйста подождите...
      </Alert>
    </Container>
  );
}
