import { useNavigate } from 'react-router-dom';
/* eslint-disable react/prop-types */
// import React from 'react';
import SockBox from '../ui/Socks/SockBox';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from '@mui/material';
import axiosInstance from '../../axiosInstance';
import { useUser } from '../../UserContext';
import { useState } from 'react';

export default function SocksCard({ fav, sock, carts }) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const addCartHendler = async () => {
    const cart = await axiosInstance.post('/socks/tocart', {
      sockId: sock.id,
      userId: user.id,
    });
    if (cart.status === 200) {
      setUser((prev) => ({
        ...prev,
      }));
    }
  };

  const addLikeHendler = async () => {
    const like = await axiosInstance.post('/socks/toliked', {
      sockId: sock.id,
      userId: user.id,
    });
    if (like.status === 200) {
      setUser((prev) => ({
        ...prev,
      }));
    }
  };

  const checkStatsHandler = async () => {
    navigate(`/socks/${sock.id}`);
  };

  return (
    <Box
      sx={{
        maxHeight: '300px',
        margin: '40px',
        backgroundColor: '#f9f8fc',
        padding: '20px',
        borderRadius: '30px',
      }}
    >
      <div onClick={checkStatsHandler} style={{ cursor: 'pointer' }}>
        <SockBox
          size={200}
          color={sock.color}
          patternColor={sock.patternColor}
          pattern={sock.pattern}
          picture={sock.picture}
        />
      </div>
      {user && (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <IconButton
            onClick={addCartHendler}
            color="primary"
            aria-label="add to favorite"
            disabled={carts.some((cart) => cart.id === sock.id)}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <IconButton
            onClick={addLikeHendler}
            color="secondary"
            aria-label="add to cart"
            disabled={fav.some((fav) => fav.id === sock.id)}
          >
            <FavoriteIcon />
          </IconButton>
        </div>
      )}
    </Box>
  );
}
