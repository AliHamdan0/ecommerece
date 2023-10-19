import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export const CartNumberItems = () => {
  const items = useSelector((state) => state.cartSlice.cart);
  const style = {
    position: 'absolute',
    backgroundColor: '#d53737',
    color: '#fff',
    padding: '5px',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '600',
  };
  return (
    <Typography sx={style}>{items?.length > 0 ? items?.length : 0}</Typography>
  );
};
