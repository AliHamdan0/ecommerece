import { Box, Container, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Recipe } from '@/components/homePage/recipe';
import { useEffect, useState } from 'react';
import useFetch from '@/utilities/useFetch';
import {
  recipesApi,
  topBlogsApi,
  topProductsApi,
} from '@/utilities/apiconfing';
import { ProductCard } from '@/components/productsPage/productCard';
import { TitleSection } from '@/components/general/titleSection';
import Link from 'next/link';
import { Loading } from '@/components/general/loading';
import { Awards } from '@/components/homePage/awards';
import BlogCard from '@/components/blogsPage/blogCard';
import Head from 'next/head';
const Carrousel = dynamic(
  () =>
    import('../components/homePage/carousel').then((mod) => mod?.MemoCarrousel),
  { ssr: false }
);
export default function Home() {
  const items = useMemo(
    () => [
      './images/background.jpg',
      './images/background-2.jpg',
      './images/background-3.jpg',
    ],
    []
  );
  const [getFetch] = useFetch();
  const [recipes, setRecipes] = useState();
  const [topProducts, setTopProducts] = useState();
  const [topBlogs, setTopBlogs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getRecipes = async () => {
      const res = await getFetch(recipesApi);
      if (res.status == 200) setRecipes(res?.data?.recipes);
    };
    const getTopProducts = async () => {
      const res = await getFetch(topProductsApi);
      if (res.status == 200) setTopProducts(res?.data?.products);
    };
    const getTopBlogs = async () => {
      const res = await getFetch(topBlogsApi);
      if (res.status == 200) setTopBlogs(res?.data?.blogs);
    };
    const getData = async () => {
      let res = await Promise.all([
        getRecipes(),
        getTopProducts(),
        getTopBlogs(),
      ]);
      setLoading(false);
    };
    getData();
  }, []);
  ////

  return (
    <Box>
      <Head>
        <title>Home Page</title>
      </Head>
      <Carrousel
        items={items}
        duration={1.8}
        animation='Xslide'
        height={100}
        delay={7}
        indicators={false}
      />
      {loading && <Loading />}
      <Container
        maxWidth='xl'
        sx={{ visibility: loading ? 'hidden' : ' visible' }}
      >
        <TitleSection
          title='Our Special Recipes'
          subTitle='The best recipes for tasting bread'
        />
        <Grid container spacing={6} sx={{ my: '50px' }}>
          {recipes?.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={3}>
              <Recipe recipe={item} />
            </Grid>
          ))}
        </Grid>
        <TitleSection
          title='Our Unique Products'
          subTitle='The Top Eight Sales Products'
        />
        <Box>
          <Link href='/products'>
            <Typography
              as='h6'
              className='seeMoreLink'
              sx={{ my: '50px', color: 'secondary.main' }}
            >
              See All -- &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={6}>
          {topProducts?.map((item) => (
            <Grid item key={item._id} xs={12} md={6} lg={3}>
              <ProductCard product={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Awards />
      <Container maxWidth='xl'>
        <Box sx={{ my: '50px' }}>
          <TitleSection
            title='Stay Motivated Read The Blogs'
            subTitle='Our Latest Blogs'
          />
        </Box>
        <Box>
          <Link href='/blogs'>
            <Typography
              as='h6'
              className='seeMoreLink'
              sx={{ my: '50px', color: 'secondary.main' }}
            >
              See All -- &gt;
            </Typography>
          </Link>
        </Box>
        <Grid container spacing={4}>
          {topBlogs?.map((item) => (
            <Grid item key={item._id} xs={12} md={4} lg={4}>
              <BlogCard
                title={item.title}
                image={item.image}
                text={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
