import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';
import {SiteTitle, PageTitle, Wrapper, Inner} from './styles';
import {usePageContext} from '../../context/pageContext';
import {getLinksColor} from '../../lib/helpers';
import {useLocale} from '../../context/localeProvider';
import MultilineHeadline from '../multilineHeadline';
import {useSectionsContext} from '../../context/sectionsContext';
import {useSiteState} from '../../context/siteContext';

const Header = ({activeSectionInfo}) => {
  const {lang} = usePageContext();
  const {menuIsOpen, cartIsOpen, filterIsOpen} = useSiteState();
  const {updateHeaderHeight} = useSectionsContext();
  const [locale] = useLocale();

  const linksColor = getLinksColor(activeSectionInfo?.type);

  const showPagetitle = !menuIsOpen && !cartIsOpen && !filterIsOpen;

  const showHeaderBackground = () => {
    if (menuIsOpen || cartIsOpen || filterIsOpen) return false;
    else if (
      activeSectionInfo?.type === 'default' ||
      activeSectionInfo?.type === 'fixedImageTextModule'
    ) {
      return true;
    }

    return false;
  };

  const headline =
    (typeof activeSectionInfo?.title === 'string' &&
      activeSectionInfo?.title) ||
    activeSectionInfo?.title?.[lang] ||
    ``;

  const headerRef = useRef();

  useEffect(() => {
    if (headerRef.current) {
      updateHeaderHeight(headerRef.current.offsetHeight);
    }
  }, [updateHeaderHeight]);

  return (
    <Wrapper
      ref={headerRef}
      type={activeSectionInfo?.type}
      showHeaderBackground={showHeaderBackground()}
    >
      <Inner linksColor={linksColor}>
        <Link to={`${lang === 'en' ? '/' : '/ar'}`}>
          <SiteTitle
            cartIsOpen={cartIsOpen}
            menuIsOpen={menuIsOpen}
            linksColor={linksColor}
          >
            <span className='title_1'>{locale?.title_1?.[lang]}</span>
            <span className='title_2'>{locale?.title_2?.[lang]}</span>
          </SiteTitle>
        </Link>
        {activeSectionInfo?.title && (
          <PageTitle
            visible={showPagetitle}
            type={activeSectionInfo?.type}
            linksColor={linksColor}
          >
            {headline && <MultilineHeadline as='div' title={headline} />}
          </PageTitle>
        )}
      </Inner>
    </Wrapper>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
