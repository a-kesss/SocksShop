import { Box, Container, Typography } from '@mui/material';
import SockBox from '../ui/Socks/SockBox';
import { useUser } from '../../UserContext';
import { useState, useEffect } from 'react';

export default function DemoPage() {
  const [demo, setDemo] = useState({
    color: '#FFFFFF',
    pattern: 1,
    patternColor: '#000000',
    picture: 1,
  });
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDemo({
        color: getRandomColor(),
        pattern: getRandomNumber(4),
        patternColor: getRandomColor(),
        picture: getRandomNumber(4),
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Container>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '1200px', // or whatever maximum width you prefer
          margin: '0 auto',
        }}
      >
        <Typography variant="h6" component="div">
          Такие носки только у нас!
        </Typography>
        <SockBox
          size={400}
          color={demo.color}
          patternColor={demo.patternColor}
          pattern={demo.pattern}
          picture={demo.picture}
        />
      </Box>
    </Container>
  );
}
