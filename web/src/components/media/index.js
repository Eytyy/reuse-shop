import React from 'react';

import Figure from './figure';

const Media = ({data, active, ...props}) => {
  return data.__typename === 'SanityVideo' ? null : (
    <Figure {...props} format='square' image={data} />
  );
};

export default Media;
