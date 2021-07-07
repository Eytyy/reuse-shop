import React from 'react';

import MobileNavigation from './mobile';
import DesktopNavigation from './desktop';
import {useSectionsContext} from '../../context/sectionsContext';

const Navigation = ({menuItems, activeSectionInfo}) => {
  const {scrollWithinHeader} = useSectionsContext();

  return (
    <>
      <DesktopNavigation
        activeSectionInfo={activeSectionInfo}
        scrollWithinHeader={scrollWithinHeader}
        navLinks={menuItems}
      />
      <MobileNavigation
        activeSectionInfo={activeSectionInfo}
        navLinks={menuItems}
      />
    </>
  );
};

export default Navigation;
