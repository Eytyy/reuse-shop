import clientConfig from '../../client-config';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(clientConfig.sanity);

export function getImageUrlFor(source) {
  return builder.image(source);
}

export function buildImageObj(source = {asset: {}}) {
  const imageObj = {
    asset: {_ref: source.asset._ref || source.asset._id},
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}
