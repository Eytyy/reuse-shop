import React, {useEffect, useRef} from 'react';

import {getLinksColor} from '../../lib/helpers';
import {useSectionsContext} from '../../context/sectionsContext';

import MenuLink from './link';
import ShopNavigation from './shop';
import {
  DesktopMainMenu,
  DesktopNavigationWrapper,
  MenuInner,
} from './desktop.styles';
import {MainMenuItem} from './styles';

const DesktopNavigation = ({
  scrollWithinHeader,
  navLinks,
  activeSectionInfo,
}) => {
  const linksColor = getLinksColor(activeSectionInfo?.type)?.main;
  const {setNavWhereabouts} = useSectionsContext();
  const navRef = useRef();

  useEffect(() => {
    if (navRef.current) {
      setNavWhereabouts(navRef.current.getBoundingClientRect().top);
    }
  }, [setNavWhereabouts]);

  return (
    <DesktopNavigationWrapper ref={navRef}>
      <MenuInner>
        <DesktopMainMenu
          scrollWithinHeader={scrollWithinHeader}
          linksColor={linksColor}
        >
          {navLinks.map((link) => (
            <MainMenuItem key={link._key}>
              <MenuLink {...link} />
            </MainMenuItem>
          ))}
        </DesktopMainMenu>
        <ShopNavigation activeSectionInfo={activeSectionInfo} />
      </MenuInner>
    </DesktopNavigationWrapper>
  );
};

export default DesktopNavigation;
