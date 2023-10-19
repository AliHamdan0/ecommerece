import { useEffect, useState } from 'react';
import { addItemToCart } from '@/utilities/apiconfing';
import { CircularProgress, Button, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';
import useFetch from '@/utilities/useFetch';
import { AlertMessage } from '../general/alertMessage';
export const UpdateQtn = ({ product, setOpen }) => {
  const [qtn, setQtn] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const items = useSelector((state) => state.cartSlice.cart);
  const [getFetch, postFetch, putFetch] = useFetch();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setQtn(e.target.value);
  };
  useEffect(() => {
    let index = items?.findIndex((item) => item._id === product._id);
    if (index > -1) setQtn(items[index].quantity);
  }, []);
  const addItem = async () => {
    setLoading(true);
    const res = await postFetch(addItemToCart, {
      productId: product._id,
      quantity: qtn,
    });
    // if (res.status == 200) {
    dispatch(cartSlice.actions.addItem({ ...product, quantity: qtn }));
    setSuccess(true);
    //  }
    setLoading(false);
  };
  return (
    <>
      <TextField
        type='number'
        value={qtn}
        size='small'
        inputProps={{ style: { textAlign: 'center' } }}
        className='qty'
        onChange={handleChange}
      />
      <Button
        variant='contained'
        startIcon={<ShoppingCartIcon />}
        onClick={() => addItem()}
      >
        ADD TO CART
        {loading && (
          <CircularProgress size='16px' sx={{ mx: 1, color: '#fff' }} />
        )}
      </Button>
      {success && (
        <AlertMessage
          msg='Updated Successfully'
          callback={() => setOpen(false)}
        />
      )}
    </>
  );
};
