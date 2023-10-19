import { CustomModal } from '../general/customModal';
import { Box, Typography } from '@mui/material';
import style from '../../styles/home.module.css';
export const BlogPopup = ({ open, setOpen, title, description }) => {
  return (
    <CustomModal open={open} setOpen={setOpen}>
      <Box sx={{ p: 3 }}>
        <Typography as='h6' className={style.mainFont}>
          {title}
        </Typography>
        <Typography as='p' sx={{ my: 3, lineHeight: 2 }}>
          {description}
        </Typography>
      </Box>
    </CustomModal>
  );
};
