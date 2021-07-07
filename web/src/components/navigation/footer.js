import React from 'react';
import {FooterMenu} from './footer.styles';
import MenuLink from './link';

const FooterNavigation = ({items}) => {
  return (
    <FooterMenu>
      {items.map((link) => (
        <MenuLink key={link._key} {...link} />
      ))}
    </FooterMenu>
  );
};

export default FooterNavigation;
