import React from 'react';

import Media from '../media';
import Slider from '.';

const MediaSlider = ({data, ...props}) => {
  return (
    <Slider data={data} dots>
      {({slide, active}) => <Media {...props} active={active} data={slide} />}
    </Slider>
  );
};

export default MediaSlider;
