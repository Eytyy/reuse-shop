import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import Figure from '../../media/figure';
import Logo from '../../Logo';
import PortableText from '../../portableText';
import {
  Header,
  PageHeadline,
  PageMainImage,
  HeaderInner,
  LogoWrapper,
  HeaderContentWrapper,
  HeaderContent,
  PageDescription,
} from './styles';
import {useSectionInfo} from '../../../context/sectionsContext';
import SectionObserver from '../../sectionObserver';
import MultilineHeadline from '../../multilineHeadline';

const HeaderModule = (props) => {
  const {lang} = usePageContext();
  const {image, headerText, title, children, location = 'default'} = props;

  const {inboundScroll, scrollPosition, visible} = useSectionInfo('pageHeader');

  function getTransparency(multiplier = 1) {
    if (!visible) return 0;

    if (scrollPosition === 0) {
      return 1;
    } else {
      return ((100 - inboundScroll * multiplier) / 100).toFixed(2);
    }
  }

  const transparency = getTransparency(1.5);

  return (
    <SectionObserver type='headerModule' id={'pageHeader'}>
      <Header>
        {location === 'default' && <div className='spacer' />}
        <HeaderInner transparency={transparency} location={location}>
          <HeaderContentWrapper>
            <HeaderContent>
              {headerText?.headline ? (
                <PageHeadline>
                  <PortableText
                    blocks={headerText.headline[lang]}
                  ></PortableText>
                </PageHeadline>
              ) : (
                <PageHeadline>
                  <MultilineHeadline dontBreak as={'div'} title={title[lang]} />
                </PageHeadline>
              )}
              {headerText?.body && (
                <PageDescription>
                  <PortableText blocks={headerText.body[lang]} />
                </PageDescription>
              )}
              {children}
            </HeaderContent>
          </HeaderContentWrapper>
          <PageMainImage>
            {image && <Figure width={800} height={800} image={image} />}
          </PageMainImage>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </HeaderInner>
      </Header>
    </SectionObserver>
  );
};

export default HeaderModule;
