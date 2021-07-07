import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {at, pad_content_from_top} from '../../styles/helpers';
import {mobile_grid} from '../../styles/layout';
import {font_styles} from '../../styles/typography';
import {
  breakpoints,
  colors,
  fonts,
  gridGap,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

export const Wrapper = styled.div`
  ${mobile_grid}
  height: var(--app-height);
  color: ${colors.links};
  background: ${colors.base};
  padding: ${wrapper_padding.mobile};

  ${at(breakpoints.tablet)} {
    display: block;
    padding: ${wrapper_padding.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
  }
`;

export const HeadlineColumn = styled.header`
  position: relative;
  opacity: ${({visible}) => (visible ? '1' : '0')};
  visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};
  transition: opacity 200ms linear;
  line-height: 1.3;
  .phone {
    direction: ltr;
    display: inline-block;
    font-family: ${fonts.en};
  }
  h2 {
    ${font_styles.display_2}
    line-height: 1.1;
    color: ${colors.secondary};
    display: none;
  }

  ${at(breakpoints.tablet)} {
    padding-top: ${`calc(${headerHeight.tablet} + ${spacing.tablet})`};
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    h2 {
      display: block;
      color: ${colors.links};
      margin-bottom: 30px;
    }
  }
  ${at(breakpoints.laptop_13)} {
    padding-top: ${`calc(${headerHeight.laptop} + ${spacing.laptop})`};
  }
`;

export const Headline = styled.div`
  position: relative;

  ${at(breakpoints.laptop_13)} {
    opacity: 1;
    transition: opacity 200ms ease-in-out;

    ${({visible}) =>
      visible &&
      css`
        opacity: 1;
      `}
  }
`;

export const ContentWrapper = styled.div`
  ${pad_content_from_top}
  position: relative;
  height: 100%;
  grid-column: 2 / 5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max-content auto min-content;
  gap: ${gridGap.mobile};

  ${HeadlineColumn} {
    grid-column: 1 / 4;
  }
  button {
    width: 100%;
  }
  ${at(breakpoints.tablet)} {
    padding: 0;
    grid-column: 1 / 2;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto max-content;
    gap: ${gridGap.tablet};
    ${HeadlineColumn} {
      grid-column: 1 / 2;
    }
  }
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(6, 1fr);
    gap: ${gridGap.laptop};
  }
`;

export const Map = styled.div`
  position: relative;
  z-index: 2;
  background: ${colors.links};
  grid-column: 1 / 4;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  ${at(breakpoints.tablet)} {
    grid-column: 2 / 5;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 2 / 7;
  }
`;

export const FooterNavigationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${gridGap.mobile};
  grid-column: 1 / 4;

  ${at(breakpoints.tablet)} {
    grid-template-columns: auto auto;
    gap: ${gridGap.tablet};
    grid-column: 2 / 7;
  }
  ${at(breakpoints.laptop_13)} {
    gap: ${gridGap.laptop};
  }
`;
export const CopyRights = styled.div`
  ${at(breakpoints.laptop_13)} {
    justify-self: flex-end;
  }
`;

export const FooterContact = styled.div``;

export const FooterContactItem = styled.div`
  margin: 0 0 15px;
  .label {
    margin: 0px 1ch 0px 0px;

    [lang='ar'] & {
      margin: 0px 0px 0px 1ch;
    }
  }
`;
