import { Typography, Box, Button } from '@mui/material';
import style from '../../styles/home.module.css';
import { useRouter } from 'next/router';

export default function HeroItem({ imgSrc, height }) {
  const Router = useRouter();
  return (
    <div className={style.slideContent}>
      <div
        style={{ backgroundImage: `url(${imgSrc}` }}
        className={style.slideImg}
      />
      <div className={style.slideImgOverlay} />
      <Box className={style.flexColCenter} sx={{ pt: '28vh' }}>
        <Box sx={{ height: '45px', overflow: 'hidden' }}>
          <Typography
            component='h1'
            sx={{
              color: '#fff',
              fontSize: { xs: '20px', lg: '28px' },
              fontWeight: 400,
              fontStyle: 'italic',
              fontFamily: 'Damion, Sans-serif',
            }}
            className={`${style.verticalMove} ${style.damionFont}`}
          >
            We Best Quality Bekary
          </Typography>
        </Box>
        <Box
          className={style.flexColCenter}
          sx={{ overflow: 'hidden', mt: 3, mb: 5 }}
        >
          <Typography
            component='h2'
            sx={{
              color: '#fff',
              fontSize: { xs: '30px', lg: '60px' },
              fontWeight: 700,
              textAlign: 'center',
            }}
            className={style.verticalMove}
          >
            Freshly baked comfort food
          </Typography>
          <Typography
            component='h3'
            sx={{
              color: '#fff',
              fontSize: { xs: '30px', lg: '60px' },
              fontWeight: 700,
              textAlign: 'center',
            }}
            className={style.verticalMove}
          >
            & French café
          </Typography>
        </Box>
      </Box>
      <Box
        className={style.flexRowCenter}
        sx={{ overflow: 'hidden', height: '60px' }}
      >
        <Button
          variant='contained'
          className={style.verticalMove}
          sx={{
            fontSize: { xs: '15px', lg: '20px' },
            py: 2,
            width: { xs: '150px', lg: '200px' },
            height: { xs: '45px', lg: '60px' },
            fontWeight: '700',
          }}
          onClick={() => Router.push('/products')}
        >
          Get Started
        </Button>
        <Button
          variant='contained'
          className={style.verticalMove}
          sx={{
            fontSize: { xs: '15px', lg: '20px' },
            py: 2,
            width: { xs: '150px', lg: '200px' },
            height: { xs: '45px', lg: '60px' },
            fontWeight: '700',
            backgroundColor: '#fff',
            color: '#000000',
            '&:hover': {
              backgroundColor: 'primary.main',
              color: '#fff',
              transition: '0.6s',
            },
          }}
          onClick={() => Router.push('/orders')}
        >
          Order Online
        </Button>
      </Box>
    </div>
  );
}
