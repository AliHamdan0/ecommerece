import { CustomModal } from '../general/customModal';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export const LoginModal = ({ open, setOpen }) => {
  const Router = useRouter();
  function handleClick() {
    const newUrl = '/login';
    Router.push(newUrl, Router.asPath);
    setOpen(false);
  }
  return (
    <CustomModal open={open} setOpen={setOpen} maxW='60vw'>
      <Box sx={{ p: 3 }}>
        <Typography
          as='h1'
          sx={{ fontSize: '22px', fontWeight: 700, my: 2, textAlign: 'center' }}
        >
          You need to log in to continue
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '15px',
            my: 2,
            p: 2,
            mx: 'auto',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='contained'
            sx={{
              fontSize: { xs: '15px', lg: '18px' },
              px: 2,
              fontWeight: '700',
            }}
            onClick={handleClick}
          >
            Log-in
          </Button>
          <Button
            variant='contained'
            sx={{
              fontSize: { xs: '15px', lg: '18px' },
              px: 2,
              fontWeight: '700',
              backgroundColor: '#fff',
              color: '#000000',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: '#fff',
                transition: '0.6s',
              },
            }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </CustomModal>
  );
};
