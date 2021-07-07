import React from 'react';

import PageModule from '../modules';
import HeaderModule from '../modules/headerModule';

const Page = ({data}) => {
  const {header, content, title} = data;

  return (
    <>
      <HeaderModule title={title} {...header} />
      {content &&
        content.map((module, index) => (
          <PageModule {...module} key={module._key} index={index} />
        ))}
    </>
  );
};

export default Page;
