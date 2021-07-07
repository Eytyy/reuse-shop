import React from 'react';
import PropTypes from 'prop-types';

import {usePageContext} from '../../context/pageContext';
import SectionObserver from '../sectionObserver';
import {useSectionsContext} from '../../context/sectionsContext';
import {useLocale} from '../../context/localeProvider';

import {
  Wrapper,
  ContentWrapper,
  Map,
  Headline,
  HeadlineColumn,
  FooterNavigationWrapper,
  CopyRights,
  FooterContact,
  FooterContactItem,
} from './styles';

import map from '../../images/rumman_map.jpg';
import MultilineHeadline from '../multilineHeadline';
import FooterNavigation from '../navigation/footer';
import {Newsletter} from '../newsletter';

const Footer = ({menuItems, phone, map: mapLink, listId}) => {
  const [
    {
      footer_headline,
      footer_hours,
      footer_callus,
      newsletter_btn_text,
      newsletter_success,
    },
  ] = useLocale();
  const {lang} = usePageContext();

  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();
  const visible = activeSectionId && activeSectionId === 'pageFooter';

  const year = new Date().getFullYear();
  const showHeader = visible;
  return (
    <SectionObserver
      id='pageFooter'
      title={footer_headline}
      type='footerModule'
    >
      <Wrapper>
        <ContentWrapper>
          <HeadlineColumn visible={showHeader}>
            <div>
              {footer_headline?.[lang] && (
                <Headline as='h2' visible={showHeader}>
                  <MultilineHeadline title={footer_headline?.[lang]} />
                </Headline>
              )}
              <FooterContact>
                <FooterContactItem>{footer_hours?.[lang]}</FooterContactItem>
                <FooterContactItem>
                  <span className='label'>{footer_callus?.[lang]}</span>
                  <a href={`tel:${phone}`} className='phone'>
                    {phone}
                  </a>
                </FooterContactItem>
                <FooterContactItem>
                  <Newsletter
                    lang={lang}
                    btnText={newsletter_btn_text?.[lang]}
                    message={newsletter_success?.[lang]}
                    listId={listId}
                  />
                </FooterContactItem>
              </FooterContact>
            </div>
          </HeadlineColumn>
          <Map>
            <a href={mapLink} rel='nofollow noreferrer' target='_blank'>
              <img src={map} alt='map' />
            </a>
          </Map>
          <FooterNavigationWrapper>
            {menuItems && <FooterNavigation items={menuItems} />}
            <CopyRights>
              {lang === 'en'
                ? `All rights reserved, Rumman Collective ${year}`
                : `جميع الحقوق محفوظة، مجموعة رمان ${year}`}
            </CopyRights>
          </FooterNavigationWrapper>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
