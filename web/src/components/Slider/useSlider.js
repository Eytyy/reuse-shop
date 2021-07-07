import React, {useState, useRef} from 'react';

import SliderNavigation from './SliderNavigation';
import SliderDots from './SliderDots';

const useSlider = (slides) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesRef = useRef([]);

  function goTo(index) {
    setActiveIndex(index);
  }

  function next() {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }

  function prev() {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }

  return {
    slidesRef,
    activeIndex,
    Navigation: () => <SliderNavigation next={next} prev={prev} />,
    Dots: () => (
      <SliderDots activeIndex={activeIndex} goTo={goTo} slides={slides} />
    ),
    next,
    prev,
  };
};

export default useSlider;
