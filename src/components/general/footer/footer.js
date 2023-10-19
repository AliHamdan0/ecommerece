import { Typography, Box, Grid, Container } from '@mui/material';
import Image from 'next/image';
export const Footer = () => {
  return (
    <Container
      maxWidth='xl'
      sx={{ backgroundColor: '#31374f', mt: '50px', py: 2 }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              as='h6'
              sx={{
                fontSize: '24px',
                letterSpacing: '-0.3px',
                fontWeight: '700',
                color: '#fff',
                mb: 2,
              }}
            >
              Address
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                21 Division St R.S.A
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                Rangpur RS 1255
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                101215, RMS
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              as='h6'
              sx={{
                fontSize: '24px',
                letterSpacing: '-0.3px',
                fontWeight: '700',
                color: '#fff',
                mb: 2,
              }}
            >
              Working Hours
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                Tuesday - Friday 08:00 - 20:00
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                Saturday - 09:00 - 18:00
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                Sunday - 09:00 - 18:00
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              as='h6'
              sx={{
                fontSize: '24px',
                letterSpacing: '-0.3px',
                fontWeight: '700',
                color: '#fff',
                mb: 2,
              }}
            >
              Phones
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                +772345242
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                +913423443
              </Typography>
              <Typography
                sx={{ fontSize: '16px', lineHeight: 1, color: '#fff' }}
              >
                +723255344
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
