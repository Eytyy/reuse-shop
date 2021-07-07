import React from 'react';
import Link from './link';

const CustomLink = ({children, cb, link}) => {
  const handleClick = () => {
    cb();
  };
  return (
    <Link onClick={handleClick} to={`/${link}`}>
      {children}
    </Link>
  );
};

export default CustomLink;
