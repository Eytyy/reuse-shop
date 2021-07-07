import React from 'react';

import HeaderModule from '../modules/headerModule';
import PageModule from '../modules';

const Home = ({data}) => {
  const {header, content} = data;
  return (
    <>
      <HeaderModule location='home' {...header} />
      {content?.map((module, index) => (
        <PageModule {...module} key={module._key} index={index} />
      ))}
    </>
  );
};

export default Home;
