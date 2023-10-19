import { Box, Typography } from '@mui/material';
import style from '../../../styles/header.module.css';
import { useMemo, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = () => {
  const Router = useRouter();
  const list = useMemo(
    () => [
      { name: 'Home', link: '/' },
      { name: 'Products', link: '/products' },
      { name: 'Blogs', link: '/blogs' },
      { name: 'Orders', link: '/orders' },
    ],
    []
  );
  return (
    <Box className={style.menuContainer} sx={{ display: 'flex' }}>
      {list?.map((item, index) => (
        <Typography
          classes={{ root: style.menuItem }}
          sx={{
            color: Router.asPath == item.link ? 'primary.main' : '#000000',
            '&:hover': { color: 'primary.main', transition: '0.4s' },
          }}
          key={index}
        >
          <Link href={item.link} prefetch={false}>
            {item.name}
          </Link>
        </Typography>
      ))}
    </Box>
  );
};
export const MenuMemo = memo(Menu);
