import { EmptyCart } from '@/components/cart/emptyCart';
import { Loading } from '@/components/general/loading';
import { PaginationInc } from '@/components/general/pagination';
import { CustomTable } from '@/components/general/table';
import { getOrdersApi } from '@/utilities/apiconfing';
import useFetch from '@/utilities/useFetch';
import { Container, Typography, Box } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export default function Orders() {
  const [getFetch] = useFetch();
  const Router = useRouter();
  const [page, setPage] = useState(Number(Router?.query?.page) || 1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      const res = await getFetch(getOrdersApi(page));
      if (res.status == 200) {
        setOrders(res.data.orders);
        setTotalCount(res.data.count);
      }
      setLoading(false);
    };
    if (Router.isReady) getOrders();
  }, [page, Router.isReady]);
  const shapeDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    return dateString;
  };
  let rows = orders?.map((i) => {
    return {
      _id: i._id,
      orderNumber: i.orderNumber,
      date: shapeDate(new Date(i.date)),
      numberItems: i.items.length,
      totalPrice: i.totalPrice,
    };
  });
  const heads = useMemo(
    () => ['Order Number', 'Date', 'Number of Items', 'Total Price'],
    []
  );
  return (
    <Container maxWidth='xl'>
      <Head>
        <title>Orders Page</title>
      </Head>
      {loading && <Loading />}
      <Typography as='h6' sx={{ fontSize: '22px', fontWeight: 700, my: 5 }}>
        Your Submitted Orders
      </Typography>
      {orders?.length == 0 ? (
        <EmptyCart msg='You did not submit any orders' />
      ) : (
        <>
          <CustomTable heads={heads} rows={rows} />
          <Box sx={{ my: '60px', display: 'flex', justifyContent: 'center' }}>
            <PaginationInc
              size={8}
              count={totalCount || 1}
              page={page}
              setPage={setPage}
            />
          </Box>
        </>
      )}
    </Container>
  );
}
