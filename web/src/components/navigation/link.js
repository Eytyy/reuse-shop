import React from 'react';
import {usePageContext} from '../../context/pageContext';
import {InternalLink, ExternalLink, CustomLink} from '../link';

const MenuLink = ({route, externalLink, page, title, cb = () => {}}) => {
  const {lang} = usePageContext();
  const localizedTitle = title[lang] || title.en || 'Untitled';

  if (page) {
    return (
      <InternalLink cb={cb} link={page}>
        {localizedTitle}
      </InternalLink>
    );
  }
  if (externalLink) {
    return (
      <ExternalLink cb={cb} link={externalLink}>
        {localizedTitle}
      </ExternalLink>
    );
  }
  if (route) {
    return (
      <CustomLink cb={cb} link={route}>
        {localizedTitle}
      </CustomLink>
    );
  }
  return null;
};

export default MenuLink;
