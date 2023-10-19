import { Box } from '@mui/material';
import { Header } from '../components/general/header/header';
import { theme } from '../components/general/theme';
import '../styles/global.css';
import { ThemeProvider } from '@mui/material/styles';
import { store } from '../utilities/reduxt-toolkit/store';
import { Provider } from 'react-redux';
import { getChecklistApi, userInfo } from '@/utilities/apiconfing';
import { useState, useEffect } from 'react';
import useFetch from '@/utilities/useFetch';
import { userSlice } from '@/utilities/reduxt-toolkit/slices/userSlice';
import Cookies from 'js-cookie';
import { Loading } from '@/components/general/loading';
import { Footer } from '@/components/general/footer/footer';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [getFetch] = useFetch();
  const token = Cookies.get('accessToken');
  useEffect(() => {
    async function getInitialData() {
      const res = await getFetch(userInfo);
      if (res.status == 200) {
        const user = res?.data?.user;
        store.dispatch(userSlice.actions.saveUser(user));
      }
      const resChecklist = await getFetch(getChecklistApi);
      if (resChecklist.status == 200) {
        store.dispatch(cartSlice.actions.getItems(resChecklist?.data?.cart));
      }
    }
    const getInitial = async () => {
      if (token) await getInitialData();
      setLoading(false);
    };
    getInitial();
  }, []);
  ////
  const cacheLtr = createCache({
    key: 'muiltr',
    prepend: true,
  });
  ////
  return (
    <Provider store={store}>
      <CacheProvider value={cacheLtr}>
        <ThemeProvider theme={theme}>
          <Box className='father'>
            <Box sx={{ height: '100px' }}>
              <Header />
            </Box>
            {loading ? <Loading /> : <Component {...pageProps} />}
          </Box>
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

export default MyApp;
