import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import style from '../../../../styles/header.module.css';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { HeaderCartMenu } from '../shoppingCart/headerCartMenu';
import { HeaderProfileMenu } from '../profileMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

export const LowerSection = ({ profile, cart, toggleDrawer }) => {
  const [anchorElSettings, setAnchorElSettings] = useState();
  const [anchorProfile, setAnchorProfile] = useState();
  const items = useSelector((state) => state.cartSlice.cart);
  const handleButtonClick = (event, setAnchorEl) => {
    setAnchorEl(event?.currentTarget);
  };
  return (
    <Box
      sx={{
        color: 'grey.white',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Box
        sx={{ display: 'flex' }}
        className={style.headList}
        onClick={(e) => handleButtonClick(e, setAnchorProfile)}
      >
        <PersonIcon />
        <ArrowDropUpIcon fontSize='small' />
      </Box>
      <HeaderProfileMenu
        anchorEl={anchorProfile}
        setAnchorEl={setAnchorProfile}
        toggleDrawer={toggleDrawer}
        position={{
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }}
      />
      <Box
        onClick={(e) => handleButtonClick(e, setAnchorElSettings)}
        sx={{ display: 'flex', position: 'relative' }}
        className={style.headList}
      >
        <ShoppingCartIcon />
        <ArrowDropUpIcon fontSize='small' />
        <Typography
          className={style.cartNumberNotify}
          sx={{ top: '-12px', left: '-12px' }}
        >
          {items?.length}
        </Typography>
      </Box>
      <HeaderCartMenu
        list={cart}
        anchorEl={anchorElSettings}
        setAnchorEl={setAnchorElSettings}
        toggleDrawer={toggleDrawer}
        position={{
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        }}
      />
    </Box>
  );
};
