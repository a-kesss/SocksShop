import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        backgroundColor: '#d9d4e7',
        padding: '20px 0',
        textAlign: 'center',
        marginTop: 'auto',
        borderRadius: '15px',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="text.secondary">
          © 2125 Enjoy socks. All rights reserved.
        </Typography>
        <Box>
          <Typography
            variant="body2"
            noWrap
          >
            Адрес: г. Москва, Шоссе Энтузиастов 12 ст2
          </Typography>

          <a style={{ color: 'pink' }} href="mailto:info@enjoysocks.ru">
            Напишите нам
          </a>
          <br />
          {/* <Typography variant="body3" noWrap>
             info@enjoysocks.ru
          </Typography> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
