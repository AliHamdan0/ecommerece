import { Loading } from "@/components/general/loading";
import { PaginationInc } from "@/components/general/pagination";
import { MemoFilter } from "@/components/productsPage/filters";
import { ProductCard } from "@/components/productsPage/productCard";
import { getProductsApi } from "@/utilities/apiconfing";
import useFetch from "@/utilities/useFetch";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

export default function Products() {
  const Router = useRouter(); //test
  const [data, setData] = useState();
  const [totalCount, setTotalCount] = useState(1);
  const [getFetch] = useFetch();
  const [page, setPage] = useState(Number(Router?.query?.page) || 1);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: 1,
    maxPrice: 100,
  });
  /////
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      const getProducts = async () => {
        setLoading(true);
        let queryApi = "";
        for (const [key, value] of Object.entries(filters))
          if (value !== "" && value != null) {
            queryApi += `&${key}=${value}`;
          }
        const response = await getFetch(getProductsApi(page, queryApi));
        if (response?.status == 200) {
          setData(response?.data?.products);
          setTotalCount(response?.data?.count);
        }
        setLoading(false);
      };
      getProducts();
    }
  }, [page, filters]);
  //////
  useEffect(() => {
    if (Router.isReady) {
      setPage(Number(Router?.query?.page) || 1);
    }
  }, [Router.isReady]);

  return (
    <Container maxWidth="xl" sx={{ mt: "50px" }}>
      <Head>
        <title>Products Page</title>
      </Head>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={3}>
          <MemoFilter setPage={setPage} setFilters={setFilters} />
        </Grid>
        <Grid item xs={12} lg={9}>
          <Grid container rowSpacing={6} columnSpacing={2}>
            {data?.map((item, index) => (
              <Grid item key={item._id} xs={12} md={6} lg={4}>
                <ProductCard product={item} index={index} />
              </Grid>
            ))}
            {loading && <Loading />}
            {data?.length == 0 && (
              <Typography
                as="h6"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "myText.primary.main",
                  my: 5,
                }}
              >
                No Data Found
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ my: "60px", display: "flex", justifyContent: "center" }}>
        <PaginationInc count={totalCount || 1} page={page} setPage={setPage} />
      </Box>
    </Container>
  );
}
