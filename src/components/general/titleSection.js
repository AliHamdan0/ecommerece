import { Typography, Box } from '@mui/material';
import style from '../../styles/home.module.css';

export const TitleSection = ({ subTitle, title }) => {
  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        component='h1'
        sx={{
          color: 'primary.main',
          fontSize: { xs: '20px', lg: '28px' },
          fontWeight: 400,
          fontStyle: 'italic',
          fontFamily: 'Damion, Sans-serif',
          mt: '50px',
        }}
        className={`${style.damionFont}`}
      >
        {subTitle}
      </Typography>
      <Typography
        component='h2'
        sx={{
          color: 'myText.primary.main',
          fontSize: { xs: '30px', lg: '48px' },
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
