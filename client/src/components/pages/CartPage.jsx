import React, { useEffect, useState } from 'react';
import { useUser } from '../../UserContext';
import axiosInstance from '../../axiosInstance';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Container,
  Grid2,
  Typography,
} from '@mui/material';
import SockBox from '../ui/Socks/SockBox';
import { Delete, Add, Remove } from '@mui/icons-material';

export default function CartPage() {
  const { user, setUser, orderSuccess, setOrderSuccess } = useUser();
  const [carts, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user) {
          const response = await axiosInstance.get(`/socks/carts/${user.id}`);
          const cartItems = response.data.map((cart) => ({
            ...cart.Sock,
            quantity: 1,
          }));
          setCart(cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [user]);

  const countHandlerPlus = (sockId) => {
    setCart((prevCarts) =>
      prevCarts.map((sock) =>
        sock.id === sockId ? { ...sock, quantity: sock.quantity + 1 } : sock,
      ),
    );
  };

  const countHandlerMinus = (sockId) => {
    setCart((prevCarts) =>
      prevCarts.map((sock) =>
        sock.id === sockId && sock.quantity > 1
          ? { ...sock, quantity: sock.quantity - 1 }
          : sock,
      ),
    );
  };

  const handleDelete = (sockId) => {
    axiosInstance
      .delete(`/socks/carts/${user.id}/${sockId}`)
      .then(() => {
        setCart((prevFav) => prevFav.filter((sock) => sock.id !== sockId));
      })
      .catch((error) => {
        console.error('Ошибка при удалении из избранного:', error);
      });
  };

  const handleOrder = async () => {
    try {
      const response = await axiosInstance.post(`/email/send-email`, {
        to: user.email,
        subject: 'Данные о заказе',
        text: JSON.stringify(carts, null, 2),
      });

      if (response.status === 200) {
        setOrderSuccess(true);
        setTimeout(() => {
          setCart([]);
        }, 3000);
        await axiosInstance.delete(`/socks/order/${user.id}`);
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  if (carts.length === 0)
    return (
      <Container
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert color="primary" variant="filled" sx={{ width: '20%' }} severity="info">
          Ваша корзина пуста
        </Alert>
      </Container>
    );

  return (
    <Box
      sx={{
        minHeight: '80vh',
        padding: 4,
      }}
    >
      <Grid2 container spacing={4} justifyContent="center">
        {carts.map((sock) => (
          <Grid2 item xs={12} sm={4} key={sock.id}>
            <Box position="relative">
              <SockBox
                color={sock.color}
                pattern={sock.pattern}
                patternColor={sock.patternColor}
                picture={sock.picture}
                size={250}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 30,
                  right: 20,
                  borderRadius: '5px',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  onClick={() => countHandlerPlus(sock.id)}
                  sx={{ color: 'pink', marginRight: 1 }}
                >
                  <Add />
                </IconButton>
                <Typography variant="body2" sx={{ marginX: 1, color: 'pink' }}>
                  <b>{sock.quantity}</b>
                </Typography>
                <IconButton
                  onClick={() => countHandlerMinus(sock.id)}
                  sx={{ color: 'pink' }}
                >
                  <Remove />
                </IconButton>
              </Box>
              <IconButton
                onClick={() => handleDelete(sock.id)}
                color="error"
                aria-label="delete"
                sx={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      <Button
        variant="contained"
        sx={{
          position: 'fixed',
          top: 100,
          right: 50,
          backgroundColor: 'pink',
          color: 'white',
        }}
        onClick={handleOrder}
      >
        Оформить заказ
      </Button>

      {orderSuccess && (
        <Alert
          severity="success"
          onClose={() => setOrderSuccess(false)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 100,
            width: '250px',
          }}
        >
          Заказ оформлен!
        </Alert>
      )}
    </Box>
  );
}
