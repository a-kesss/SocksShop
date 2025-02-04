import { useState } from 'react';
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../UserContext';
import Logo from '../../assets/Logo.png';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function NavBar() {
  const [showsignup, setShowsignup] = useState(false);
  const [showsignin, setShowsignin] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleShowsignup = () => {
    setShowsignup(!showsignup);
  };

  const handleShowsignin = () => {
    setShowsignin(!showsignin);
  };

  const hadleLogOut = async () => {
    const VITE_API_URL = import.meta.env.VITE_API_URL;
    try {
      const res = await axiosInstance.get('/auth/logout');
      if (res.status === 204) {
        setUser(null);
        setAccessToken('');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#0e172c' }} position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={RouterLink} to="/" edge="start" sx={{ mr: 2 }}>
            <img
              src={Logo}
              alt="My Custom Icon"
              style={{ width: '60px', height: '60px' }}
            />
          </IconButton>

          <Button
            component={RouterLink}
            to="/allsocks"
            color="inherit"
            sx={{
              textTransform: 'none',
            }}
          >
            <Typography variant="h6">Все носки</Typography>
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Button
                component={RouterLink}
                to="/favorites"
                color="inherit"
                startIcon={<FavoriteIcon />}
                sx={{ textTransform: 'none' }}
              >
                <Typography>Избранное</Typography>
              </Button>

              <Button
                component={RouterLink}
                to="/cart"
                color="inherit"
                startIcon={<ShoppingCartIcon />}
                sx={{ textTransform: 'none' }}
              >
                <Typography>Корзина</Typography>
              </Button>

              <Typography variant="h6" sx={{ ml: 2 }}>
                Привет, {user.username}
              </Typography>

              <Button
                onClick={hadleLogOut}
                variant="text"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleShowsignin}
                variant="text"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Войти
              </Button>
              <Button
                onClick={handleShowsignup}
                variant="text"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Регистрация
              </Button>
              <SignInModal show={showsignin} handleClose={handleShowsignin} />
              <SignUpModal show={showsignup} handleClose={handleShowsignup} />
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
