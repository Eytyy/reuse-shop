import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {
  breakpoints,
  colors,
  gridGap,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;
  background-color: ${({type, showHeaderBackground}) =>
    showHeaderBackground
      ? type === 'footerModule'
        ? colors.base
        : 'rgba(255,255,255, 1)'
      : 'rgba(255,255,255, 0)'};
  transition: background-color 200ms linear;
  width: 100%;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }

  [lang='ar'] & {
    left: auto;
    right: 0;
  }

  ${at(breakpoints.tablet)} {
    background: none;
  }
  ${at(breakpoints.laptop_13)} {
    width: 33.333%;
  }
`;

export const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: ${wrapper_padding.mobile};
  gap: ${gridGap.mobile};
  color: ${({linksColor, menuIsOpen}) =>
    menuIsOpen ? colors.base : linksColor.main};
  ${at(breakpoints.tablet)} {
    padding: ${wrapper_padding.tablet} ${wrapper_padding.tablet} 0;
  }
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${gridGap.laptop};
    padding: ${wrapper_padding.laptop} 0 0 ${wrapper_padding.laptop};
    [lang='ar'] & {
      padding: ${wrapper_padding.laptop} ${wrapper_padding.laptop} 0 0;
    }
  }
`;

export const SiteTitle = styled.h1`
  font-size: 16px;
  line-height: 1.2em;
  color: ${({linksColor, cartIsOpen, menuIsOpen}) => {
    return cartIsOpen
      ? colors.links
      : menuIsOpen
      ? colors.base
      : linksColor.main;
  }};
  margin: 0;
  transition: color linear 300ms, opacity linear 300ms;
  display: flex;
  flex-direction: column;
  ${at(breakpoints.laptop_13)} {
    font-size: 20px;
  }
  [lang='ar'] & {
    flex-direction: column-reverse;
  }
`;

export const PageTitle = styled.div`
  color: ${({linksColor}) => linksColor.secondary};
  font-size: 16px;
  line-height: 1.3em;
  grid-column: 2 / 4;
  margin: 0;
  transition: color linear 300ms, opacity linear 300ms;
  opacity: ${({visible}) => (visible ? 1 : 0)};
  visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};
  ${at(breakpoints.tablet)} {
    display: none;
    font-size: 35px;
    padding-top: ${spacing.laptop};
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
`;
