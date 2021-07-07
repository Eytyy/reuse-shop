import React from 'react';
import {Nav, SliderBtnNext, SliderBtnPrev} from './styles';
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md';
const SliderNavigation = ({next, prev}) => {
  return (
    <Nav>
      <SliderBtnPrev onClick={prev}>
        <MdNavigateBefore />
      </SliderBtnPrev>
      <SliderBtnNext onClick={next}>
        <MdNavigateNext />
      </SliderBtnNext>
    </Nav>
  );
};

export default SliderNavigation;
