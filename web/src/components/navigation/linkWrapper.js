import React from 'react';
import {CustomLink, ExternalLink, InternalLink} from '../link';

const LinkWrapper = ({page, route, externalLink, children}) => {
  if (page) {
    return <InternalLink link={page}>{children}</InternalLink>;
  }
  if (externalLink) {
    return <ExternalLink link={externalLink}>{children}</ExternalLink>;
  }
  if (route) {
    return <CustomLink link={route}>{children}</CustomLink>;
  }
  return null;
};

export default LinkWrapper;
