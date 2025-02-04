import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Container,
  MenuItem,
  Alert,
  ButtonGroup,
} from '@mui/material';
import SockBox from '../ui/Socks/SockBox';
import { useState } from 'react';
import { MuiColorInput } from 'mui-color-input';
import axiosInstance from '../../axiosInstance';
import { useUser } from '../../UserContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function SockGenerator() {
  const [formData, setFormData] = useState({
    type: '',
    color: 'white',
    pattern: '',
    patternColor: '',
    picture: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user } = useUser();

  const changepatternColorHandler = (e) => {
    setFormData((prev) => ({ ...prev, patternColor: e }));
  };

  const changeSockColorHandler = (e) => {
    setFormData((prev) => ({ ...prev, color: e }));
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const patterns = [
    { value: '', label: 'Без узора' },
    {
      value: '1',
      label: 'Треугольники',
    },
    {
      value: '2',
      label: 'Звезды',
    },
    {
      value: '3',
      label: 'Геометрия',
    },
    {
      value: '4',
      label: 'Горошек',
    },
  ];

  const images = [
    { value: '', label: 'Без картинки' },
    {
      value: '1',
      label: 'Кактус',
    },
    {
      value: '2',
      label: 'Йода',
    },
    {
      value: '3',
      label: 'Утка',
    },
    {
      value: '4',
      label: 'Лама',
    },
  ];

  // создаётся носок в бд
  const submitHandler = (e) => {
    e.preventDefault();
    axiosInstance.post('/socks', formData).then((res) => {
      if (res.status === 200) setSuccess(true);
      else setError(res.data);
    });
  };

  // создаётся носок и добавляется в корзину, иожно поменять
  const addToCartHandler = (e) => {
    e.preventDefault();
    axiosInstance.post('/socks', formData).then((res) => {
      axiosInstance
        .post('/socks/tocart', { userId: user.id, sockId: res.data.id })
        .then((res) => {
          if (res.status === 200) setSuccess(true);
          else setError(res.data);
        });
    });
  };

  const addToFavHandler = (e) => {
    e.preventDefault();
    axiosInstance.post('/socks', formData).then((res) => {
      axiosInstance
        .post('/socks/toliked', { userId: user.id, sockId: res.data.id })
        .then((res) => {
          if (res.status === 200) setSuccess(true);
          else setError(res.data);
        });
    });
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          gap: '20px',
        }}
      >
        {error && (
          <Alert sx={{ width: '50%' }} severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert sx={{ width: '50%' }} severity="success">
            Носок успешно добавлен
          </Alert>
        )}
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            gap: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SockBox
            sx={{
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%': {
                  transform: 'translateY(0px)',
                },
                '50%': {
                  transform: 'translateY(-20px)',
                },
                '100%': {
                  transform: 'translateY(0px)',
                },
              },
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              },
            }}
            picture={formData.picture}
            color={formData.color}
            pattern={formData.pattern}
            patternColor={formData.patternColor}
            size={500}
          ></SockBox>
          <Box sx={{ flex: 1 }}>
            <Typography
              color="secondary"
              style={{ fontSize: '30px', marginBottom: '10px' }}
              variant="h6"
              component="h2"
              mb={2}
            >
              Создай свой уникальный носок!
            </Typography>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              onSubmit={submitHandler}
            >
              <Typography
                style={{ marginBottom: '0px' }}
                variant="h6"
                component="h2"
                mb={2}
              >
                Цвет узора
              </Typography>
              <MuiColorInput
                color="secondary"
                fullWidth
                disabled={formData.pattern === ''}
                value={formData.patternColor}
                format="hex"
                onChange={changepatternColorHandler}
                name="patternColor"
              ></MuiColorInput>

              <TextField
                color="secondary"
                borderRadius="10px"
                name="pattern"
                onChange={changeHandler}
                value={formData.pattern}
                id="pattern-select"
                select
                fullWidth
                label="Узор"
                defaultValue=""
                helperText="Выберите узор"
              >
                {patterns.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography
                style={{ marginBottom: '0px' }}
                variant="h6"
                component="h2"
                mb={2}
              >
                Цвет носка
              </Typography>
              <MuiColorInput
                color="secondary"
                value={formData.color}
                format="hex"
                onChange={changeSockColorHandler}
                name="color"
                fullWidth
              ></MuiColorInput>

              <TextField
                color="secondary"
                name="picture"
                onChange={changeHandler}
                value={formData.picture}
                id="picture-select"
                select
                fullWidth
                label="Картинка"
                defaultValue=""
                helperText="Выберите картинку"
              >
                {images.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box
                sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
              >
                <ButtonGroup color="inherit" variant="outlined">
                  <Button type="submit">Создать</Button>
                  <Button color="secondary" type="button" onClick={addToFavHandler}>
                    <FavoriteIcon />
                  </Button>
                  <Button color="secondary" type="button" onClick={addToCartHandler}>
                    <ShoppingCartIcon />
                  </Button>
                </ButtonGroup>
              </Box>
            </form>
          </Box>
        </div>
      </Box>
    </Container>
  );
}
