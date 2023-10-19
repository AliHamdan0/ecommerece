import { FiltersControl } from '@/components/general/filters/filterControl';
import { Loading } from '@/components/general/loading';
import { PaginationInc } from '@/components/general/pagination';
import BlogCard from '@/components/blogsPage/blogCard';
import { getAllBlogs } from '@/utilities/apiconfing';
import useFetch from '@/utilities/useFetch';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
export default function Blogs() {
  const Router = useRouter();
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState(1);
  const [search, setSearch] = useState('');
  const [getFetch] = useFetch();
  const [page, setPage] = useState(Number(Router?.query?.page) || 1);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    const response = await getFetch(getAllBlogs(page, search));
    if (response?.status == 200) {
      setData(response?.data?.blogs);
      setTotalCount(response?.data?.count);
    }
    setLoading(false);
  };
  /////
  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const response = await getFetch(getAllBlogs(page, search));
      if (response?.status == 200) {
        setData(response?.data?.blogs);
        setTotalCount(response?.data?.count);
      }
      setLoading(false);
    };
    if (Router.isReady) getBlogs();
  }, [Router.isReady, page]);
  //////
  // useEffect(() => {
  //   if (Router.isReady) {
  //     setPage(Number(Router?.query?.page) || 1);
  //   }
  // }, [Router.isReady]);

  return (
    <Container
      maxWidth='xl'
      sx={{
        mt: '50px',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Head>
        <title>Blogs Page</title>
      </Head>
      <Box>
        <Grid
          container
          spacing={4}
          justifyContent='space-between'
          sx={{ mb: '70px' }}
        >
          <Grid item xs={12} md={4} lg={4}>
            <Typography as='h6' sx={{ fontSize: '22px', fontWeight: 700 }}>
              Check Out Our Recent Blogs
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <FiltersControl
              control='search'
              value={search}
              label='Search By Title'
              handleChange={(e) => setSearch(e.target.value)}
              submit={(e) => getBlogs()}
            />
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={4}>
            {data?.map((item) => (
              <Grid item key={item._id} xs={12} md={4} lg={4}>
                <BlogCard
                  title={item.title}
                  image={item.image}
                  text={item.description}
                />
              </Grid>
            ))}
          </Grid>
          {loading && <Loading />}
        </Box>
      </Box>
      <Box sx={{ my: '60px', display: 'flex', justifyContent: 'center' }}>
        <PaginationInc count={totalCount || 1} page={page} setPage={setPage} />
      </Box>
    </Container>
  );
}
