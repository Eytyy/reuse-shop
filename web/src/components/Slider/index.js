import React, {useRef} from 'react';

import useSlider from './useSlider';
import {Slide, SliderWrapper} from './styles';
import {usePageContext} from '../../context/pageContext';
import {debounce} from 'lodash';

const Slider = ({data, children, nav, dots}) => {
  const {Navigation, Dots, activeIndex, slidesRef, next, prev} = useSlider(
    data
  );
  const touchStart = useRef();

  const {lang} = usePageContext();

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchMove = debounce((e) => {
    let touchEnd = e.changedTouches[0].clientX;
    if (
      (touchStart.current > touchEnd && lang == 'en') ||
      (touchStart.current < touchEnd && lang == 'ar')
    ) {
      next();
    } else {
      prev();
    }
  }, 200);

  return (
    <SliderWrapper>
      <div className='inner'>
        {data.map((slide, i) => {
          const key = slide._key || slide._id;
          const active = activeIndex === i;
          slidesRef.current[i] = slidesRef.current[i] || React.createRef();
          return (
            <Slide
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              ref={slidesRef.current[i]}
              key={key}
              active={active}
            >
              {children({slide, active})}
            </Slide>
          );
        })}
      </div>
      {nav && data?.length > 1 && <Navigation />}
      {dots && data?.length && <Dots />}
    </SliderWrapper>
  );
};

export default Slider;
