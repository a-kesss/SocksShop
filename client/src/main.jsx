import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { UserProvider } from './UserContext.jsx';
import { BrowserRouter } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const primary = {
  50: '#f1f7ff',
  100: '#e9efff',
  200: '#dfe5ff',
  300: '#ced4f2',
  400: '#aab0cd',
  500: '#8a90ac',
  600: '#626883',
  700: '#4e556e',
  800: '#30374e',
  900: '#0e172c',
};
const secondary = {
  50: '#f0eaf9',
  100: '#d9ccf1',
  200: '#c0aae8',
  300: '#a786df',
  400: '#926ad7',
  500: '#7f50cf',
  600: '#754ac8',
  700: '#6841be',
  800: '#5d3bb6',
  900: '#4a2fa8',
};
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  palette: {
    primary: {
      main: primary[900],
    },
    secondary: {
      main: secondary[500],
    },
  },
});

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </UserProvider>,
);
