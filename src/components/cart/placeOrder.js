import { Typography, Box, Button } from '@mui/material';
import { CustomModal } from '../general/customModal';
import { AlertMessage } from '../general/alertMessage';
import { Loading } from '../general/loading';
import { useState } from 'react';
import { placeOrderApi } from '@/utilities/apiconfing';
import { useDispatch, useSelector } from 'react-redux';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';
import useFetch from '@/utilities/useFetch';
import { useRouter } from 'next/router';
export const PlaceOrder = ({ open, setOpen, totalPrice }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const items = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();
  const [getFetch, postFetch] = useFetch();
  const Router = useRouter();
  const handleConfirm = async () => {
    setLoading(true);
    const bodyItems = items?.map((i) => i._id);
    const res = await postFetch(placeOrderApi, {
      date: new Date().toISOString(),
      items: bodyItems,
      totalPrice: totalPrice,
    });
    if (res.status == 200) {
      dispatch(cartSlice.actions.clearAllItems());
      Router.push('/');
    }
    setLoading(false);
    setSuccess(true);
    setOpen(false);
  };
  return (
    <CustomModal open={open} setOpen={setOpen} maxW='60vw'>
      <Box sx={{ p: 3 }}>
        {loading && <Loading />}
        {success && (
          <AlertMessage msg='New Order Has Been Submitted Successfully' />
        )}
        <Typography
          as='h1'
          sx={{ fontSize: '22px', fontWeight: 700, my: 2, textAlign: 'center' }}
        >
          Confirm, Place This Order
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
            onClick={() => handleConfirm()}
          >
            Confirm
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
