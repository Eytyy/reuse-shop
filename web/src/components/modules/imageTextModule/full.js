import React from 'react';
import {
  useSectionInfo,
  useSectionsContext,
} from '../../../context/sectionsContext';
import {breakpoints, padding} from '../../../styles/vars';
import Figure from '../../media/figure';
import MultilineHeadline from '../../multilineHeadline';
import LinkWrapper from '../../navigation/linkWrapper';
import PortableText from '../../portableText';
import {
  Body,
  FullWrapper,
  FullWrapperContent,
  Headline,
  ImageWrapper,
} from './styles';

const Full = ({id, headline, body, lang, image, linkTo}) => {
  const {scrollPosition, y} = useSectionInfo(id);
  const {headerHeight, getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();
  const visible = activeSectionId && id === activeSectionId;

  function getTransparency() {
    // if not active hide
    if (!visible) return 0;

    // if still at lower half of screen return 0 so the text doesn't overlap with navigation
    if (scrollPosition < y - headerHeight) return 0;

    if (typeof window === 'undefined') return 1;

    // Start fading out between y and y - header height
    if (
      window.innerWidth >= breakpoints.laptop_13 &&
      scrollPosition > y - headerHeight
    ) {
      const scrollAfterY = scrollPosition - y;
      const amountScrolledPerHeaderHeight = scrollAfterY / headerHeight;

      return scrollAfterY > headerHeight
        ? 0
        : 1 - amountScrolledPerHeaderHeight;
    }
    if (scrollPosition > y + padding.mobile) {
      const scrollAfterY = scrollPosition - y;
      const amountScrolledPerHeaderHeight = scrollAfterY / (headerHeight + 30);

      return scrollAfterY > headerHeight
        ? 0
        : 1 - amountScrolledPerHeaderHeight;
    }

    return 1;
  }
  const transparency = getTransparency();

  return (
    <FullWrapper>
      <FullWrapperContent transparency={transparency}>
        {headline[lang] && (
          <Headline as='h2'>
            <MultilineHeadline title={headline[lang]} />
          </Headline>
        )}
        {body?.[lang] ? (
          linkTo ? (
            <LinkWrapper {...linkTo}>
              <Body>
                <PortableText blocks={body[lang]} />
              </Body>
            </LinkWrapper>
          ) : (
            <Body>
              <PortableText blocks={body[lang]} />
            </Body>
          )
        ) : null}
      </FullWrapperContent>
      <ImageWrapper transparency={1}>
        <Figure image={image} />
      </ImageWrapper>
    </FullWrapper>
  );
};

export default Full;
