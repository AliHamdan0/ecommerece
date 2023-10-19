import { useEffect, useState, memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import HeroItem from './HeroItem';
import style from '../../styles/home.module.css';
import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Carrousel = ({
  items,
  duration,
  animation,
  height = 400,
  autoPlay = true,
  delay = 0,
  loop = true,
  controls = true,
  indicators = true,
}) => {
  const [active, setActive] = useState(0);
  const [dir, setDire] = useState(0); // 0:start, 1 forward, 2 backward, -1 indicator
  const [data, setData] = useState([...items]);
  const handlers = useSwipeable({
    onSwipedLeft: () => Next(),
    onSwipedRight: () => Prev(),
  });
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        Next();
      }, delay * 1000);

      return () => clearInterval(timer);
    }
  }, [data, active]);

  const Next = () => {
    if (loop || active < data.length - 1) {
      setActive(active + 1);
      setDire(1);
      const item = data[0];
      data.push(item);
      data.splice(0, 1);
      setData(data);
    }
  };

  const Prev = () => {
    if (loop || active > 0) {
      setActive(active - 1);
      setDire(2); //start moving in the negaive direction
      const item = data[data?.length - 1];
      data.unshift(item);
      data.splice(data.length - 1, 1);
      setData(data);
    }
  };

  const Nextsliders = () => {
    //excute after the rendering process
    switch (animation) {
      case 'Xslide':
        return Xslide();
      case 'Yslide':
        return Yslide();
      case 'Fade':
        return Fade();
    }
  };
  const Xslide = () => {
    if (dir === -1) {
      return keyframes`
      from {transform: translateX(${-100}%); opacity: 0;}
      to   {transform: translateX(${-100}%); opacity: 1}`;
    } else if (dir === 0) {
      return keyframes`
      from {transform: translateX(${-100}%)}
      to   {transform: translateX(${-100}%)}`;
    } else if (dir === 1) {
      return keyframes`
  from {transform: translateX(${0}%)}
  to   {transform: translateX(${-100}%)}`;
    } else if (dir === 2) {
      return keyframes`
      from {transform: translateX(${-200}%)}
      to   {transform: translateX(${-100}%)}`;
    }
  };

  /////

  const Yslide = () => {
    if (dir === 0) {
      return keyframes`
    from {transform: translatey(-${height}vh)}
    to   {transform: translatey(-${height}vh)}`;
    } else if (dir === 1) {
      return keyframes`
from {transform: translatey(0%)}
to   {transform: translatey(-${height}vh)}`;
    } else if (dir === 2) {
      return keyframes`
    from {transform: translatey(-${2 * height}vh)}
    to   {transform: translatey(-${height}vh)}`;
    }
  };

  ////
  const Fade = () => {
    return keyframes`
    from {opacity: 0}
    to   {opacity:1}`;
  };
  ///
  const goTo = (index) => {
    setActive(index);
    setDire(-1);
    const swapItems = [...items];
    /////After Intialization
    for (let i = 0; i < index; i++) {
      const item = swapItems[0];
      swapItems.push(item);
      swapItems.splice(0, 1);
    }
    setData([...swapItems]);
  };
  ///
  const AnimateDiv = styled.div`
    animation: ${Nextsliders} ${duration}s ease-in-out forwards;
    display: flex;
    flex-direction: ${() => (animation === 'Yslide' ? 'column' : 'row')};
  `;
  return (
    <div className={style.carouselContainer}>
      <div className={style.sliderContainer}>
        <AnimateDiv {...handlers}>
          {data.map((item, index) => (
            <HeroItem
              key={index}
              imgSrc={typeof item === 'string' ? item : ''}
              height={height}
            />
          ))}
        </AnimateDiv>
        {controls && (
          <Box
            className={style.arrowContainerDiv}
            sx={{
              display: { xs: 'none', md: 'flex' },
              px: 2,
            }}
          >
            <Box
              onClick={() => Prev()}
              className={style.arrowSlider}
              sx={{ '&:hover': { backgroundColor: 'primary.main' } }}
            >
              <ArrowBackIosNewIcon
                sx={{ color: '#fff', width: '34px', height: '34px' }}
              />
            </Box>
            <Box
              onClick={() => Next()}
              className={style.arrowSlider}
              sx={{ '&:hover': { backgroundColor: 'primary.main' } }}
            >
              <ArrowForwardIosIcon
                sx={{ color: '#fff', width: '34px', height: '34px' }}
              />
            </Box>
          </Box>
        )}
        {indicators && (
          <div>
            {items.map((item, index) => (
              <button key={index} className='mx-3' onClick={() => goTo(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export const MemoCarrousel = memo(Carrousel);
