import { Box, Typography, Button } from '@mui/material';
import { FiltersControl } from '../general/filters/filterControl';
import { useState, useEffect, memo } from 'react';
import { Helpers } from '@/utilities/helpers';
import { useRouter } from 'next/router';

const Filters = ({ setPage, setFilters }) => {
  const Router = useRouter();
  const [addToUrl] = Helpers();

  const obj = {
    name: '',
    category: '',
    minPrice: 1,
    maxPrice: 100,
  };
  const [filterValue, setFilterValue] = useState(obj);
  const [price, setPrice] = useState([1, 100]);
  useEffect(() => {
    if (Router.isReady) {
      let init = {
        ...filterValue,
        ...Router['query'],
      };
      delete init?.page;
      if (init.minPrice && init.maxPrice)
        setPrice([init.minPrice, init.maxPrice]);
      setFilterValue({ ...init });
      setFilters({
        ...init,
      });
    }
  }, [Router.isReady]);

  const handleChangSearch = (newValue) => {
    setFilterValue({ ...filterValue, name: newValue });
  };
  const handleChangeCategory = (event) => {
    const value = event.target.value;
    setFilterValue({
      ...filterValue,
      category: value,
    });
  };
  const handleChangeRange = (event, newValue) => {
    setPrice(newValue);
    setFilterValue({
      ...filterValue,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };
  const FilterSubmit = () => {
    addToUrl({
      page: 1,
      ...filterValue,
    });
    setPage(1);
    setFilters({
      ...filterValue,
    });
  };
  const handleClear = () => {
    addToUrl();
    setPage(1);
    setFilterValue({ ...obj });
    setFilters({ ...obj });
    setPrice([1, 100]);
  };
  return (
    <Box sx={{ boxShadow: '0px 0px 5px #80808036', p: 2 }}>
      <Typography as='h6' sx={{ fontSize: '22px', fontWeight: 700, mb: 2 }}>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <FiltersControl
          control='search'
          value={filterValue.name}
          label='Product Name'
          handleChange={(e) => handleChangSearch(e.target.value)}
          submit={(e) => FilterSubmit()}
        />
        <FiltersControl
          control='singleSelectField'
          label='Product Category'
          value={filterValue.category}
          handleChange={(e) => handleChangeCategory(e)}
          options={[
            { id: 1, value: 'Fast Food' },
            { id: 2, value: 'Candy' },
            { id: 3, value: 'Bread' },
            { id: 4, value: 'Sweet' },
          ]}
          filterValue={filterValue}
          propertyName='category'
        />
        <Box>
          <Typography as='h6' sx={{ fontSize: '18px', fontWeight: 700, mb: 2 }}>
            Price Range
          </Typography>
          <FiltersControl
            control='range'
            value={price}
            handleChange={handleChangeRange}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          my: 5,
        }}
      >
        <Button
          variant='contained'
          sx={{
            fontSize: { xs: '15px', lg: '18px' },
            px: 2,
            fontWeight: '700',
          }}
          onClick={() => FilterSubmit()}
        >
          Submit
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
          onClick={() => handleClear()}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};
export const MemoFilter = memo(Filters);
