import React from 'react';
import {Dot, Dots} from './styles';

const SliderDots = ({slides, goTo, activeIndex}) => {
  return (
    <Dots>
      {slides.map(({_key}, index) => (
        <Dot
          active={index === activeIndex}
          onClick={() => goTo(index)}
          key={_key}
        />
      ))}
    </Dots>
  );
};

export default SliderDots;
