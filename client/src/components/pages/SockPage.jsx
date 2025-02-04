import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '../../axiosInstance';
import SockBox from '../ui/Socks/SockBox';
import { Alert, Box, Container, Typography } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';

export default function SockPage() {
  const { id } = useParams();
  const [sock, setSock] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/socks/${id}`)
      .then((res) => {
        setSock(res.data);
      })
      .then(console.log(sock));
  }, [id]);

  if (!!sock) {
    return (
      <Container sx={{ height: '80vh', display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '20px',
            padding: '20px',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '100vh',
            margin: '0 auto',
          }}
        >
          <SockBox
            size={500}
            color={sock.color}
            patternColor={sock.patternColor}
            pattern={sock.pattern}
            picture={sock.picture}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              gap: '20px',
              padding: '20px',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Typography variant="h6" component="div">
              Цвет узора
            </Typography>
            <MuiColorInput disabled value={sock.patternColor}></MuiColorInput>
            <Typography variant="h6" component="div">
              Цвет носка
            </Typography>
            <MuiColorInput disabled value={sock.color}></MuiColorInput>
            <Typography variant="h6" component="div">
              Узор
            </Typography>
            <Typography variant="h6" component="div">
              {sock.pattern}
            </Typography>
            <Typography variant="h6" component="div">
              Картинка
            </Typography>
            <Typography variant="h6" component="div">
              {sock.picture}
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

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
        Загрузка... Пожалуйста подождите...Возможно такого носка нет :(
      </Alert>
    </Container>
  );
}
