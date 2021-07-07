import React from 'react';
import {Link as GatsbyLink} from 'gatsby';
import {usePageContext} from '../../context/pageContext';

const Link = ({to, ref, ...rest}) => {
  const {lang} = usePageContext();
  const localizedPath = lang === 'en' ? to : `/${lang}${to}`;
  return <GatsbyLink activeClassName='active' {...rest} to={localizedPath} />;
};

export default Link;
