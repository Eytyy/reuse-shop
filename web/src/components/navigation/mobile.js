import React from 'react';

import {useSiteState, useToggleMenu} from '../../context/siteContext';

import {MdClose, MdMenu} from 'react-icons/md';

import MenuLink from './link';
import ShopNavigation from './shop';

import {getLinksColor} from '../../lib/helpers';
import {colors} from '../../styles/vars';
import {
  MobileMainMenu,
  MobileNavigationWrapper,
  Controls,
  MenuWrapper,
  LogoWrapper,
} from './mobile.styles';
import {MainMenuItem, NavIcon} from './styles';
import Logo from '../Logo';

const MobileNavigation = ({navLinks, activeSectionInfo}) => {
  const toggleMenu = useToggleMenu();
  const {menuIsOpen} = useSiteState();
  const linksColor = menuIsOpen
    ? colors.base
    : getLinksColor(activeSectionInfo?.type)?.main;

  return (
    <MobileNavigationWrapper>
      <MenuWrapper menuIsOpen={menuIsOpen}>
        <MobileMainMenu>
          {navLinks.map((link) => (
            <MainMenuItem key={link._key}>
              <MenuLink cb={toggleMenu} {...link} />
            </MainMenuItem>
          ))}
        </MobileMainMenu>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
      </MenuWrapper>
      <Controls>
        <NavIcon linksColor={linksColor} onClick={toggleMenu}>
          {menuIsOpen ? <MdClose /> : <MdMenu />}
        </NavIcon>
        <ShopNavigation activeSectionInfo={activeSectionInfo} />
      </Controls>
    </MobileNavigationWrapper>
  );
};

export default MobileNavigation;
