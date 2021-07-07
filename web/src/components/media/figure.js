import React from 'react';
import {getImageUrlFor, buildImageObj} from '../../lib/image-helpers';

function getImageHeight({width, format, image}) {
  switch (format) {
    case 'square':
      return width;
    case 'original':
      const originalAspectRatio = image.asset.metadata.dimensions.aspectRatio;
      return width / originalAspectRatio;
    default:
      const defaultRatio = 9 / 16;
      return Math.floor(defaultRatio * width);
  }
}

const Figure = ({width = 1200, height, format = 'landscape', image}) => {
  const imageHeight = height || getImageHeight({width, format, image});
  const imgUrl =
    image &&
    getImageUrlFor(buildImageObj(image))
      .width(width)
      .height(imageHeight)
      .fit('crop')
      .auto('format')
      .url();
  return imgUrl ? <img src={imgUrl} alt={image.alt || ''} /> : <></>;
};

export default Figure;
