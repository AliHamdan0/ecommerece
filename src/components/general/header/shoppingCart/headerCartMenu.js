import {
  Box,
  Menu,
  MenuItem,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import style from '../../../../styles/header.module.css';
import { ShoppingItem } from './shoppingItem';
import useFetch from '@/utilities/useFetch';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PlaceOrder } from '@/components/cart/placeOrder';
import { LoginModal } from '@/components/cart/loginModal';
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
export const HeaderCartMenu = ({
  anchorEl,
  setAnchorEl,
  toggleDrawer = () => '',
}) => {
  const Router = useRouter();
  const close = () => {
    setAnchorEl(null);
    toggleDrawer(null);
  };
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const items = useSelector((state) => state.cartSlice.cart);
  const user = useSelector((state) => state.userSlice.info);
  //////
  useEffect(() => {
    const calculatePrice = () => {
      let sum = 0;
      for (let i = 0; i < items?.length; i++)
        sum += items[i].price * items[i].quantity;
      return sum;
    };
    let sum = calculatePrice();
    setTotalPrice(sum);
  }, [items]);

  const handlePlaceOrder = () => {
    if (user?.name) setOpen(true);
    else {
      close();
      setLogin(true);
    }
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
          minWidth: { xs: '90vw', md: '230px' },
        },
      }}
      {...pos}
    >
      {items?.length == 0 ? (
        <Typography
          component='h6'
          className={style.cartFont}
          sx={{ textAlign: 'center', my: 2 }}
        >
          Your cart is empty
        </Typography>
      ) : (
        <Box>
          {items?.map((item) => (
            <Fragment key={item._id}>
              {/* <MenuItem> */}
              <Box sx={{ p: 2, my: 0 }}>
                <ShoppingItem item={item} />
              </Box>
              {/* </MenuItem> */}
              <Divider />
            </Fragment>
          ))}
          <MenuItem>
            <Box sx={{ display: 'flex', mx: 'auto', mt: 2 }}>
              <Typography component='h6' className={style.cartFont}>
                Total Price
              </Typography>
              <Typography
                component='h6'
                className={style.cartFont}
                sx={{ color: 'primary.main', mx: 1 }}
              >
                ${totalPrice}
              </Typography>
            </Box>
          </MenuItem>
          {/* <MenuItem> */}
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              my: 2,
              p: 2,
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              sx={{
                fontSize: { xs: '15px', lg: '18px' },
                px: 2,
                fontWeight: '700',
              }}
              onClick={() => {
                close();
                Router.push('/cart');
              }}
            >
              View Cart
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
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </Button>
          </Box>
          {/* </MenuItem> */}
        </Box>
      )}
      <PlaceOrder open={open} setOpen={setOpen} totalPrice={totalPrice} />
      <LoginModal open={login} setOpen={setLogin} />
    </Menu>
  );
};
