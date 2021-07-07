import React from 'react';

const ExternalLink = ({link, style, children}) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className={style}
      kind={style}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
