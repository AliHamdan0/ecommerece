import { Box, Typography, Container, Button } from '@mui/material';
import style from '../styles/cart.module.css';
import { EmptyCart } from '@/components/cart/emptyCart';
import { useSelector } from 'react-redux';
import { CustomTable } from '@/components/general/table';
import { PlaceOrder } from '@/components/cart/placeOrder';
import { useState, useEffect, useMemo } from 'react';
import { LoginModal } from '@/components/cart/loginModal';
import Head from 'next/head';
export default function Cart() {
  const items = useSelector((state) => state.cartSlice.cart);
  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.userSlice.info);
  let rows = items?.map((i) => {
    return {
      _id: i._id,
      image: i.image,
      name: i.name,
      category: i.category,
      quantity: i.quantity,
      price: i.price * i.quantity,
    };
  });
  const heads = useMemo(
    () => ['Image', 'Name', 'Category', 'Quantity', 'Price', ''],
    []
  );
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
    else setLogin(true);
  };
  return (
    <Container maxWidth='xl' sx={{ mt: 3 }}>
      <Head>
        <title>Cart Page</title>
      </Head>
      <Typography as='h1' className={style.cartTitle} sx={{ mb: '4px' }}>
        Cart
      </Typography>
      {items?.length == 0 ? (
        <EmptyCart />
      ) : (
        <Box>
          <CustomTable rows={rows} heads={heads} type='cart' />
          <Box
            sx={{
              display: 'flex',
              gap: '3vw',
              px: '5vw',
              my: 2,
              justifyContent: 'end',
              alignItems: 'center',
            }}
          >
            <Typography as='h1' className={style.cartTitle}>
              Total Price :
            </Typography>
            <Typography
              as='h1'
              className={style.cartTitle}
              sx={{ color: 'primary.main', mt: '4px' }}
            >
              ${totalPrice}
            </Typography>
          </Box>
          <Box sx={{ my: '50px', mx: 'auto', width: 'fit-content' }}>
            <Button
              variant='contained'
              sx={{
                fontSize: { xs: '15px', lg: '18px' },
                px: 2,
                fontWeight: '700',
                minWidth: { xs: '150px', md: '30vw' },
              }}
              onClick={() => handlePlaceOrder()}
            >
              Place Order
            </Button>
            <PlaceOrder open={open} setOpen={setOpen} totalPrice={totalPrice} />
            <LoginModal open={login} setOpen={setLogin} />
          </Box>
        </Box>
      )}
    </Container>
  );
}
