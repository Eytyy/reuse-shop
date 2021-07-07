import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {
  breakpoints,
  colors,
  gridGap,
  headerHeight,
  wrapper_padding,
} from '../../styles/vars';
import {MainMenu} from './styles';

export const MobileMainMenu = styled(MainMenu)`
  grid-column: 1 / 5;
`;

export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto 210px;
  gap: ${gridGap.mobile};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  font-size: 40px;
  line-height: 1.2em;
  padding: ${wrapper_padding.mobile};
  padding-top: ${`calc(${headerHeight.mobile} + ${wrapper_padding.mobile} + ${wrapper_padding.mobile})`};
  background: ${colors.secondary};
  opacity: ${({menuIsOpen}) => (menuIsOpen ? `1` : `0`)};
  transform: ${({menuIsOpen}) =>
    menuIsOpen ? `translate(0)` : `translateX(-100%)`};
  transition: transform 200ms ease-in-out, opacity 200ms ease-in-out;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }
  [lang='ar'] & {
    right: 0;
    left: auto;
    transform: ${({menuIsOpen}) =>
      menuIsOpen ? `translate(0%)` : `translateX(100%)`};
  }

  ${at(breakpoints.tablet)} {
    font-size: 52px;
    padding: ${wrapper_padding.tablet};
    padding-top: ${`calc(${headerHeight.tablet} + ${wrapper_padding.tablet} + ${wrapper_padding.tablet})`};
  }
`;

export const LogoWrapper = styled.div`
  grid-column: 2/5;
  grid-column: 2/5;
  display: flex;
  justify-content: flex-end;
  svg {
    height: 100%;
    width: auto;
  }
`;

export const Controls = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 11;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }
`;

export const MobileNavigationWrapper = styled.div`
  ${Controls} {
    padding: ${wrapper_padding.mobile};
  }

  ${at(breakpoints.tablet)} {
    ${Controls} {
      padding: ${wrapper_padding.tablet};
    }
  }
  ${at(breakpoints.laptop_13)} {
    display: none;
  }
`;
