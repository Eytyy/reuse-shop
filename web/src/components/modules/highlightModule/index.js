import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import {
  useSectionInfo,
  useSectionsContext,
} from '../../../context/sectionsContext';
import {breakpoints, padding} from '../../../styles/vars';
import Figure from '../../media/figure';
import PortableText from '../../portableText';
import SectionObserver from '../../sectionObserver';

import {
  Body,
  Headline,
  Wrapper,
  ImageWrapper,
  ContentWrapper,
  BackDrop,
} from './styles';

const HighlightModule = (props) => {
  const {lang} = usePageContext();
  const {body, headline, image, index, id} = props;
  const isFirst = index === 0;
  const {scrollPosition, visible, y} = useSectionInfo(id);
  const {headerHeight} = useSectionsContext();

  function getTransparency(offset = 1) {
    // if not active hide
    if (!visible) return 0;
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= breakpoints.laptop_13) return 1;

    // if still at lower half of screen return 0 so the text doesn't
    // overlap with navigation
    if (scrollPosition < y - window.innerHeight / 3) return 0;

    if (scrollPosition > y - headerHeight + padding.mobile) {
      const yMinusHeader = y - headerHeight;
      const scrollAfterYminusHeader = scrollPosition - yMinusHeader;
      const amountScrolledPerHeaderHeight =
        scrollAfterYminusHeader / headerHeight;

      return scrollAfterYminusHeader > headerHeight
        ? 0
        : (1 - amountScrolledPerHeaderHeight) * offset;
    }
    return 1;
  }

  // just a random value to start applying transparency.. this is a mess but whatever. I'm sorry
  const transparency = getTransparency();

  return (
    <SectionObserver type='highlightModule' id={id}>
      {isFirst && <BackDrop />}
      <Wrapper visible={visible} dontPad={isFirst}>
        <ContentWrapper>
          {headline?.[lang] && (
            <Headline transparency={transparency}>
              <PortableText blocks={headline[lang]} />
            </Headline>
          )}
          {body?.[lang] && (
            <Body>
              <PortableText blocks={body[lang]} />
            </Body>
          )}
          <ImageWrapper transparency={transparency}>
            <Figure image={image} />
          </ImageWrapper>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default HighlightModule;
