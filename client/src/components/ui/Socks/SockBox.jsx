import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './SockBox.css';
import SockColor from './SockColor';
import Sockbase from './Sockbase';
import Sock from './Sock';
import Image from './Image';

export default function SockBox({
  type,
  color = 'white',
  pattern,
  patternColor,
  picture,
  size,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        perspective: '1000px',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: '20px',
          background:
            'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 100%)',
          borderRadius: '15px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px) rotateY(5deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            background:
              'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(230,230,230,1) 100%)',
          },
        }}
      >
        <div
          style={{
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%': {
                transform: 'translateY(0px)',
              },
              '50%': {
                transform: 'translateY(-10px)',
              },
              '100%': {
                transform: 'translateY(0px)',
              },
            },
            width: size,
            height: size,
          }}
          className="my_box"
        >
          <SockColor color={color} width={size} height={size} />
          <Sockbase
            patternColor={patternColor}
            type={Number(pattern)}
            width={size}
            height={size}
          />
          <Sock width={size} height={size} />
          <Image image={Number(picture)} width={size} height={size} />
        </div>
      </Paper>
    </Box>
  );
}
