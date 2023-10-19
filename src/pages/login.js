import { Box, Button, Typography, Container } from '@mui/material';
import useFetch from '../utilities/useFetch';
import Head from 'next/head';
import style from '../styles/log.module.css';
import { getChecklistApi, login } from '../utilities/apiconfing';
import FormikControl from '@/components/general/formik/formikControls';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '@/utilities/reduxt-toolkit/slices/userSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Loading } from '@/components/general/loading';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';

export default function LogIn() {
  const [getFetch, postFetch] = useFetch();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const Router = useRouter();
  const items = useSelector((state) => state.cartSlice.cart);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    const currentRoute = Router.asPath === '/login' ? '/' : `${Router.asPath}`;
    const res = await postFetch(login, values);
    if (res.status == 200) {
      const { accessToken } = res?.data;
      Cookies.set('accessToken', accessToken, {
        path: '/',
        secure: true,
        expires: 7,
      });
      dispatch(userSlice?.actions?.saveUser(res?.data?.user));
      if (items?.length == 0) {
        const resCart = await getFetch(getChecklistApi, {
          Authorization: `Bearer ${accessToken}`,
        });
        if (resCart.status == 200) {
          dispatch(cartSlice.actions.getItems(resCart?.data?.cart));
        }
      }
      setLoading(false);
      Router.push(currentRoute);
    } else {
      setLoading(false);
      setFieldError('email', res?.response?.data?.message);
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required('required'),
    password: Yup.string().required('required'),
  });

  return (
    <Container maxWidth='sm'>
      {loading && <Loading />}
      <Head>
        <title>Log-in Page</title>
      </Head>
      <Box className={style.boxCard}>
        <Typography
          component='h6'
          className={style.mainFont}
          sx={{
            fontSize: { xs: '18px', md: '35px' },
            color: 'myText.primary.main',
            mt: 3,
            mb: '50px',
          }}
        >
          Enter your email and password
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          <Form>
            <FormikControl control='inputText' name='email' label='Email' />
            <FormikControl
              control='inputText'
              name='password'
              type='password'
              label='Password'
            />
            <Box className={style.buttonContainer} sx={{ mt: 4, mb: '50px' }}>
              <Button
                variant='contained'
                className={style.logButton}
                sx={{ width: { xs: '100px', md: '130px' } }}
                type='submit'
                disabled={loading}
              >
                Log-In
              </Button>
              <Button
                type='button'
                variant='outlined'
                sx={{
                  color: 'primary.main',
                  width: { xs: '100px', md: '130px' },
                }}
                className={style.logButton}
                disabled={loading}
                onClick={() => Router.push('/signup')}
              >
                Sign-Up
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
}
