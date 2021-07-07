import React from 'react';
import MediaSlider from '../Slider/MediaSlider';

const MediaBlock = ({data, ...props}) => {
  return <MediaSlider {...props} data={data} />;
};

export default MediaBlock;
