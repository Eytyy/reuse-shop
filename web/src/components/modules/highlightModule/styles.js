import styled from '@emotion/styled';
import {at} from '../../../styles/helpers';
import {mobile_grid} from '../../../styles/layout';
import {font_styles} from '../../../styles/typography';
import {
  breakpoints,
  colors,
  gridGap,
  wrapper_padding,
} from '../../../styles/vars';

export const Wrapper = styled.div`
  position: relative;
  height: ${`calc(var(--app-height) - ${wrapper_padding.mobile} - ${wrapper_padding.mobile})`};
  padding: ${wrapper_padding.mobile};
  margin: 0 auto;

  ${at(breakpoints.tablet)} {
    height: ${`calc(var(--app-height) - ${wrapper_padding.tablet} - ${wrapper_padding.tablet})`};
    padding: 0 ${wrapper_padding.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    display: grid;
    gap: ${gridGap.laptop};
    height: ${`calc(var(--app-height) - ${wrapper_padding.laptop} - ${wrapper_padding.laptop})`};
    padding: 0 ${wrapper_padding.laptop};
    grid-template-columns: repeat(6, 1fr);
  }
`;

export const BackDrop = styled.div`
  background: ${colors.secondary};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  ${at(breakpoints.laptop_13)} {
    height: 40%;
  }
`;

export const ContentWrapper = styled.div`
  ${mobile_grid}
  grid-template-rows: min-content auto min-content;
  position: relative;
  z-index: 2;
  height: 100%;
  ${at(breakpoints.tablet)} {
    gap: ${gridGap.tablet};
  }
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: min-content auto;
    gap: ${gridGap.laptop};
    grid-column: 2 / 7;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  grid-row: 2 / 3;
  grid-column: 2 / 5;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 2 / 6;
    opacity: ${(props) => props.transparency};
    transition: opacity 300ms ease-in-out;
  }
`;

export const Headline = styled.h2`
  ${font_styles.display_2}
  margin: 0;
  grid-row: 1 / 2;
  grid-column: 1 / 5;

  opacity: ${(props) => props.transparency};
  transition: opacity 200ms ease-in-out;

  ${at(breakpoints.laptop_13)} {
    grid-column: 1 / 5;
    grid-row: 1 / 2;
  }
`;

export const Body = styled.div`
  ${font_styles.body};
  color: ${colors.secondary};
  grid-row: 3 / 4;
  grid-column: 2 / 5;

  ${at(breakpoints.laptop_13)} {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    align-self: end;
  }
`;
