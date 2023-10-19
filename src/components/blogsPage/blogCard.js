import Image from 'next/image';
import style from '../../styles/home.module.css';
import { Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { BlogPopup } from './blogPopup';
import { useState } from 'react';
function BlogCard({ title, image, text }) {
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <div className={style.projectCard}>
      <div className={style.flexCard}>
        <Image
          src={image || ''}
          alt='BlogCard'
          style={{
            objectFit: 'cover',
          }}
          fill
          sizes='(min-width:100%), (max-height:100%)'
          className={style.projCardIMG}
        />
      </div>
      <Box sx={{ p: 1 }}>
        <Typography
          as='h6'
          sx={{
            my: '8px',
            fontWeight: '700',
            fontSize: '22px',
            textTransform: 'capitalize',
            color: 'myText.primary.main',
          }}
        >
          {title}
        </Typography>
        <Typography
          as='p'
          sx={{ color: 'myText.secondary.main', mb: '27px' }}
          className={style.lineText}
        >
          {text}
        </Typography>
        <Button
          variant='containd'
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          className={style.projectButton}
          onClick={() => setOpen(true)}
        >
          See More
        </Button>
      </Box>
      <BlogPopup
        open={open}
        setOpen={setOpen}
        title={title}
        description={text}
      />
    </div>
  );
}
export default BlogCard;
