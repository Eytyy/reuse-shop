import React from 'react';

import ContentModule from '../modules/contentModule';
import EventsModule from '../modules/eventsModule';
import HighlightModule from '../modules/highlightModule';
import ImageTextModule from '../modules/imageTextModule';
import NestedPagesModule from '../modules/nestedPagesModule';
import ProductsModule from '../modules/productsModule';

const PageModule = ({_key, index, ...props}) => {
  switch (props._type) {
    case 'contentModule':
      return <ContentModule {...props} id={_key} index={index} />;
    case 'highlightModule':
      return <HighlightModule {...props} id={_key} index={index} />;
    case 'productsModule':
      return <ProductsModule {...props} id={_key} index={index} />;
    case 'imageTextModule':
      return <ImageTextModule {...props} id={_key} index={index} />;
    case 'eventsModule':
      return <EventsModule {...props} id={_key} index={index} />;
    case 'pagesModule':
      return <NestedPagesModule {...props} id={_key} index={index} />;
    default:
      return <div key={index}>Content not supported :(</div>;
  }
};

export default PageModule;
