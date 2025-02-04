import { Route, Routes } from 'react-router';
import Root from './Root';

import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import MainPage from './components/pages/MainPage';
import { useUser } from './UserContext';
import FavPage from './components/pages/FavPage';

import SockPage from './components/pages/SockPage';
import AllSocksPage from './components/pages/AllSocksPage';
import CartPage from './components/pages/CartPage';
import PageNotFound from './components/pages/PageNotFound';

function App() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/tokens/refresh`)
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .then(setLoading(false));
  }, []);

  if (loading) {
    return (
      <div id="loading">
        <img id="loading-image" src="path/to/ajax-loader.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Root />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="/socks/:id" element={<SockPage />} />
        <Route path="/allsocks" element={<AllSocksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
export default App;
