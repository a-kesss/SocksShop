import { Box, Container, Typography } from '@mui/material';
import SockBox from '../ui/Socks/SockBox';
import { useUser } from '../../UserContext';
import { useState, useEffect } from 'react';
import DemoPage from './DemoPage';
import SockGenerator from './SockGenerator';

export default function MainPage() {
  const { user, setUser } = useUser();
  const [sock, setSock] = useState(null);

  if (!!user) {
    return <SockGenerator></SockGenerator>
  }

  return <DemoPage></DemoPage>;
}
