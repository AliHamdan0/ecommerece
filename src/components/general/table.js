import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import useFetch from '@/utilities/useFetch';
import { deleteCartItem, updateItemCart } from '@/utilities/apiconfing';
import { useDispatch } from 'react-redux';
import { cartSlice } from '@/utilities/reduxt-toolkit/slices/cartSlice';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  height: '75px',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.cart.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const CustomTable = ({ heads, rows, type = '' }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            {heads?.map((head, index) => (
              <StyledTableCell key={index}>{head}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledRow key={row.name} row={row} type={type} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledRow = ({ row, type = '' }) => {
  const [loading, setLoading] = useState(false);
  const [valueLoading, setValueLoading] = useState(false);
  const [getFetch, postFetch, putFetch] = useFetch();
  const dispatch = useDispatch();

  const updateQuantity = async (qtn) => {
    if (qtn > 0 && qtn < 100) {
      setValueLoading(true);
      let res = await putFetch(updateItemCart, {
        productId: row._id,
        quantity: qtn,
      });
      //   if (res.status == 200) {
      dispatch(cartSlice.actions.updateItem({ _id: row._id, quantity: qtn }));
      //   }
      setValueLoading(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    if (type == 'cart') {
      let res = await putFetch(deleteCartItem, { productId: row._id });
      // if (res.status == 200) {
      dispatch(cartSlice.actions.deleteItem(row._id));
      //  }
    }
    setLoading(false);
  };
  return (
    <StyledTableRow>
      {Object.entries(row)?.map(([key, value], ind) => (
        <>
          {!key.startsWith('_') && (
            <StyledTableCell key={key} align='left'>
              {key == 'image' ? (
                <Image src={value} width={60} height={60} alt='' />
              ) : key == 'quantity' ? (
                <Box sx={{ display: 'flex', cursor: 'pointer' }}>
                  <AddIcon
                    sx={{ color: 'primary.main' }}
                    onClick={() => updateQuantity(row.quantity + 1)}
                  />
                  {valueLoading ? (
                    <CircularProgress
                      size='16px'
                      color='secondary'
                      sx={{ mx: 1 }}
                    />
                  ) : (
                    <Typography
                      as='p'
                      sx={{ fontSize: '16px', fontWeight: 500, mx: 2 }}
                    >
                      {value}
                    </Typography>
                  )}
                  <RemoveIcon
                    sx={{ color: 'primary.main' }}
                    onClick={() => updateQuantity(row.quantity - 1)}
                  />
                </Box>
              ) : (
                <Typography as='p' sx={{ fontSize: '16px', fontWeight: 500 }}>
                  {value}
                </Typography>
              )}
            </StyledTableCell>
          )}
        </>
      ))}
      {type == 'cart' && (
        <StyledTableCell>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'start' }}>
            {loading ? (
              <CircularProgress size='16px' color='secondary' />
            ) : (
              <IconButton
                sx={{
                  color: 'secondary.main',
                  width: '16px',
                  height: '16px',
                  fontSize: '12px',
                }}
                onClick={() => handleDelete()}
              >
                X
              </IconButton>
            )}
          </Box>
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
};
