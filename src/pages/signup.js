import { Box, Button, Typography, Container } from '@mui/material';
import useFetch from '../utilities/useFetch';
import Head from 'next/head';
import style from '../styles/log.module.css';
import { signUp } from '../utilities/apiconfing';
import FormikControl from '@/components/general/formik/formikControls';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState, useCallback } from 'react';
import { Loading } from '@/components/general/loading';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AlertMessage } from '@/components/general/alertMessage';
import ClearIcon from '@mui/icons-material/Clear';
import Image from 'next/image';

export default function SignUp() {
  const [getFetch, postFetch] = useFetch();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const [image, setImage] = useState(null);
  const imgRef = useRef();
  const hobbiesOptions = useMemo(
    () => [
      { id: '1', name: 'Swimming' },
      { id: '2', name: 'Reading' },
      { id: '3', name: 'Walking' },
      { id: '4', name: 'Football' },
    ],
    []
  );
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    hobbies: [],
    image: null,
  });
  const Router = useRouter();

  const onFileUpload = useCallback((event) => {
    const { files } = event.target;
    setImage(files[0]);
  }, []);

  const handleUploadButton = useCallback(() => {
    imgRef.current.click();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('occupation', values.occupation);
    // formData.append('image', image);

    const res = await postFetch(signUp, formData, {
      'content-type': 'multipart/form-data',
    });
    if (res.status == 201 || res.status == 200) {
      setLoading(false);
      setAlert('success');
      Router.push('/login');
    } else {
      setAlert('error');
      setLoading(false);
    }
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('required'),
    email: Yup.string().email().required('required'),
    password: Yup.string().required('required'),
  });

  return (
    <Container maxWidth='sm'>
      {loading && <Loading />}
      {alert != '' ? (
        alert == 'success' ? (
          <AlertMessage msg='Add a new User successfully' />
        ) : (
          <AlertMessage alertType='error' />
        )
      ) : (
        ''
      )}
      <Head>
        <title>Sign-up Page</title>
      </Head>
      <Box className={style.boxCard}>
        <Typography
          component='h6'
          className={style.mainFont}
          sx={{
            fontSize: { xs: '18px', md: '35px' },
            color: 'myText.primary.main',
            mt: 3,
            mb: '25px',
          }}
        >
          Create a new account
        </Typography>
        <Formik
          initialValues={newUser}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          <Form>
            <FormikControl control='inputText' name='name' label='Name' />
            <FormikControl control='inputText' name='email' label='Email' />
            <FormikControl
              control='inputText'
              name='password'
              type='password'
              label='Password'
            />
            <FormikControl
              control='inputSelect'
              name='hobbies'
              label='Hobbies'
              options={hobbiesOptions}
              requiredStar={false}
            />
            <FormikControl
              control='inputText'
              name='occupation'
              label='Occupation'
              requiredStar={false}
            />
            <input
              type='file'
              accept='image/png, image/jpeg'
              style={{ display: 'none' }}
              ref={imgRef}
              onChange={(e) => onFileUpload(e)}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
            {image && (
              <Typography
                component='h6'
                sx={{
                  fontWeight: '600',
                  letterSpacing: '0.3px',
                  fontSize: '18px',
                }}
              >
                Profile Image :
              </Typography>
            )}
            {image ? (
              <Box
                sx={{
                  mt: '15px',
                  mb: '35px',
                  position: 'relative',
                  width: 'fit-content',
                }}
              >
                <ClearIcon
                  onClick={() => setImage(null)}
                  className={style.closeIcon}
                />
                <Image
                  src={URL.createObjectURL(image)}
                  alt='Uploaded Image preview'
                  width='0'
                  height='0'
                  sizes='300px'
                  responsive='true'
                  className={style.responsiveImage}
                />
              </Box>
            ) : (
              <Box
                className={style.inputUploadFile}
                sx={{ marginBottom: '30px' }}
                onClick={() => handleUploadButton()}
              >
                <Typography
                  component='span'
                  sx={{
                    fontWeight: '600',
                    letterSpacing: '0.3px',
                    fontSize: '16px',
                  }}
                >
                  Upload Profile Image
                </Typography>
                <FileUploadIcon sx={{ mx: 1, color: 'primary.main' }} />
              </Box>
            )}
            <Box className={style.buttonContainer} sx={{ mt: 2, mb: '25px' }}>
              <Button
                variant='contained'
                className={style.logButton}
                sx={{ width: { xs: '100px', md: '130px' } }}
                type='submit'
                disabled={loading}
              >
                Sign-Up
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
                onClick={() => Router.push('/login')}
              >
                Log-In
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
}
