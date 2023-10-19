import { Box, Divider, Typography } from '@mui/material';
import style from '../../../../styles/header.module.css';
import Link from 'next/link';

export const UpperSection = ({ toggleDrawer }) => {
  return (
    <Box sx={{ pt: 5, display: 'flex', flexDirection: 'column', gap: '35px' }}>
      <Box onClick={() => toggleDrawer()}>
        <Link href='/' sx={{ width: '100%', height: '100%' }} prefetch={false}>
          <Typography
            className={style.headerMobileFontSelect}
            sx={{ color: 'grey.white', width: '100%' }}
          >
            Home
          </Typography>
        </Link>
        <Divider sx={{ borderColor: 'grey.white' }} />
      </Box>
      <Box onClick={() => toggleDrawer()}>
        <Link
          href='/products'
          sx={{ width: '100%', height: '100%' }}
          prefetch={false}
        >
          <Typography
            className={style.headerMobileFontSelect}
            sx={{ color: 'grey.white', width: '100%' }}
          >
            Products
          </Typography>
        </Link>
        <Divider sx={{ borderColor: 'grey.white' }} />
      </Box>
      <Box onClick={() => toggleDrawer()}>
        <Link
          href='/blogs'
          sx={{ width: '100%', height: '100%' }}
          prefetch={false}
        >
          <Typography
            className={style.headerMobileFontSelect}
            sx={{ color: 'grey.white', width: '100%' }}
          >
            Blogs
          </Typography>
        </Link>
        <Divider sx={{ borderColor: 'grey.white' }} />
      </Box>
      <Box onClick={() => toggleDrawer()}>
        <Link
          href='/orders'
          sx={{ width: '100%', height: '100%' }}
          prefetch={false}
        >
          <Typography
            className={style.headerMobileFontSelect}
            sx={{ color: 'grey.white', width: '100%' }}
          >
            Orders
          </Typography>
        </Link>
        <Divider sx={{ borderColor: 'grey.white' }} />
      </Box>
    </Box>
  );
};
