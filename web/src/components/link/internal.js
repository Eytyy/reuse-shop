import React from 'react';
import Link from './link';

const InternalLink = ({children, link, cb}) => {
  const handleClick = () => {
    cb();
  };
  return (
    <Link onClick={handleClick} to={`/${link.slug.current}`}>
      {children}
    </Link>
  );
};

export default InternalLink;
