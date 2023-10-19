import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import style from '../../../styles/header.module.css';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { OpenDrawer } from './header';
import { userSlice } from '@/utilities/reduxt-toolkit/slices/userSlice';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';

const pos = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
};
export const HeaderProfileMenu = ({ anchorEl, setAnchorEl, position = {} }) => {
  const user = useSelector((state) => state.userSlice.info);
  const closeDrawer = useContext(OpenDrawer) || function () {};
  const Router = useRouter();
  const dispatch = useDispatch();
  const close = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    //   close();
    Cookies.remove('accessToken', { path: '/', secure: true });
    dispatch(userSlice.actions.clearUser());
    dispatch(cartSlice.actions.clearAllItems());
    closeDrawer();
    setAnchorEl(null);
    Router.push('/login');
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={close}
      keepMounted
      disableScrollLock={true}
      sx={{ mt: '20px' }}
      MenuListProps={{
        sx: {
          backgroundColor: 'brand.secondaryDark',
          boxShadow: 'none',
          minWidth: { xs: '60vw', md: '200px' },
        },
      }}
      {...pos}
      {...position}
    >
      <Box sx={{ py: 1, px: 1 }}>
        <MenuItem>
          <Box className={style.headFlex} sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '500',
                wordSpacing: '2px',
              }}
            >
              {user?.name ? `Hello ${user.name}` : 'Hello Guest'}
            </Typography>
            {user?.name && (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: 'primary.main',
                }}
                src={user?.image ? user.image : null}
              >
                {user.name.slice(0, 2)}
              </Avatar>
            )}
          </Box>
        </MenuItem>
        {!user?.name ? (
          <MenuItem
            onClick={() => {
              close();
              Router.push('/login');
            }}
          >
            <Box className={style.headFlex} sx={{ width: '100%', mt: '15px' }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '400',
                  wordSpacing: '2px',
                }}
              >
                Log in
              </Typography>
              <LoginIcon sx={{ color: 'green', fontSize: '26px' }} />
            </Box>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleLogOut()}>
            <Box className={style.headFlex} sx={{ width: '100%', mt: '15px' }}>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '400',
                  wordSpacing: '2px',
                }}
              >
                Log out
              </Typography>
              <LogoutIcon sx={{ color: 'red', fontSize: '26px' }} />
            </Box>
          </MenuItem>
        )}
      </Box>
    </Menu>
  );
};
