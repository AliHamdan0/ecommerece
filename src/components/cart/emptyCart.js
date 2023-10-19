import { Box, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import style from '../../styles/cart.module.css';
import React from 'react';

export const EmptyCart = ({ msg = 'Your cart is currently empty' }) => {
  return (
    <>
      <Box
        sx={{ width: '100%', height: '2px', backgroundColor: 'primary.main' }}
      ></Box>
      <Box className='flexRow' sx={{ backgroundColor: 'cart.main', p: 3 }}>
        <CalendarTodayIcon sx={{ color: 'primary.main' }} />
        <Typography
          as='p'
          className={style.cartText}
          sx={{ color: 'cart.text' }}
        >
          {msg}
        </Typography>
      </Box>
    </>
  );
};
