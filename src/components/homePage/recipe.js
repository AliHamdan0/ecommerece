import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import style from '../../styles/home.module.css';
import { CustomModal } from '../general/customModal';
import { useState } from 'react';
import CountUp, { useCountUp } from 'react-countup';

export const Recipe = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0); //to run count up only once
  useCountUp({
    ///general setting
    ref: recipe._id,
    end: recipe?.number,
    enableScrollSpy: true,
    scrollSpyOnce: true,
    scrollSpyDelay: 200,
    duration: 1.2,
  });
  return (
    <>
      <Box
        className={style.recipeBox}
        sx={{ width: '100%', position: 'relative' }}
        onClick={() => setOpen(true)}
      >
        <Image
          src={recipe?.image}
          alt=''
          style={{
            objectFit: 'contain',
          }}
          width={84}
          height={88}
        />
        <Typography
          as='h6'
          className={style.mainFont}
          sx={{
            color: 'myText.primary.main',
            '&:hover': { color: 'primary.main' },
          }}
        >
          {recipe?.title}
        </Typography>
        <Typography
          as='h6'
          className={style.mainFont}
          sx={{
            color: 'secondary.main',
          }}
          id={`${recipe._id}`}
        >
          <CountUp
            start={start}
            end={recipe?.number}
            onEnd={() => setStart(recipe?.number)}
            enableScrollSpy
          />
        </Typography>
      </Box>
      <CustomModal open={open} setOpen={setOpen}>
        <Box sx={{ p: 3 }}>
          <Typography as='h6' className={style.mainFont}>
            {`${recipe?.title}'s Detail :`}
          </Typography>
          <Typography as='p' sx={{ my: 3, lineHeight: 2 }}>
            {recipe?.description}
          </Typography>
        </Box>
      </CustomModal>
    </>
  );
};
