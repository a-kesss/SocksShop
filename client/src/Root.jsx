import { Outlet } from 'react-router';
import NavBar from './components/ui/NavBar';
import Footer from './components/ui/Footer';
import { Box } from '@mui/material';

export default function Root() {
  return (
    <>
      <Box
        sx={{
          backgroundColor:"#fec7d7",
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <NavBar />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}
