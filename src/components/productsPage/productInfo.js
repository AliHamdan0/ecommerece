import Image from 'next/image';
import { Box, Typography, Grid } from '@mui/material';
import { UpdateQtn } from './updateQtn';

export const ProductInfo = ({ product, setOpen }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ position: 'relative', minHeight: '300px' }}
      >
        <Image
          src={product?.image}
          alt=''
          style={{
            objectFit: 'contain',
          }}
          fill
          sizes='(min-width:100%), (max-height:100%)'
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ display: 'flex', flexDirection: 'column', px: 3, py: 4 }}>
          <Typography
            as='h6'
            sx={{
              color: 'myText.primary.main',
              fontSize: '24px',
              fontWeight: 600,
              mb: 1,
              textTransform: 'capitalize',
            }}
          >
            {product?.name}
          </Typography>
          <Typography
            as='h6'
            sx={{
              my: 1,
              color: 'primary.main',
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            ${product.price}
          </Typography>
          <Typography
            as='p'
            sx={{
              fontSize: '18px',
              my: 3,
              lineHeight: 2,
              color: 'myText.secondary.main',
            }}
          >
            {product?.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography
              as='h6'
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'myText.primary.main',
              }}
            >
              Qty :
            </Typography>
            <UpdateQtn product={product} setOpen={setOpen} />
          </Box>
          <Box
            sx={{
              my: 3,
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <Typography
              as='h6'
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'myText.primary.main',
              }}
            >
              Category :
            </Typography>
            <Typography
              as='h6'
              sx={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#000000',
              }}
            >
              {product?.category}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
