import { Box, SwipeableDrawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import style from '../../../../styles/header.module.css';
import { UpperSection } from './upperSection';
import { LowerSection } from './lowerSection';
export const MobileHeader = ({ cart = [], anchorEl, setAnchorEl, profile }) => {
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setAnchorEl(null);
  };

  const list = () => (
    <Box
      className={style.upperBox}
      sx={{
        width: '98vw',
        backgroundColor: 'brand.secondaryDark',
        minHeight: '100vh',
        py: 3,
        px: 2,
      }}
      role='presentation'
      onKeyDown={() => toggleDrawer()}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            alt=''
            src='/images/logo.png'
            width={134}
            height={31}
            priority
          />
          <CloseIcon
            sx={{ color: 'grey.white', fontSize: '40px' }}
            onClick={toggleDrawer}
          />
        </Box>
        <UpperSection toggleDrawer={toggleDrawer} />
      </Box>
      <LowerSection profile={profile} cart={cart} toggleDrawer={toggleDrawer} />
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor='left'
      open={Boolean(anchorEl)}
      onClose={() => toggleDrawer()}
      onOpen={() => toggleDrawer()}
    >
      {list()}
    </SwipeableDrawer>
  );
};
