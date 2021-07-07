import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {breakpoints, wrapper_padding} from '../../styles/vars';
import {MainMenu} from './styles';

export const DesktopMainMenu = styled(MainMenu)`
  font-size: 30px;
  line-height: 1em;
  transition: font-size 200ms linear;
  a {
    margin-bottom: 6px;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: ${(props) => (props.scrollWithinHeader ? '30px' : '20px')};
  }
`;

export const DesktopNavigationWrapper = styled.div`
  position: fixed;
  bottom: ${wrapper_padding.mobile};
  left: 0;
  z-index: 10;
  display: none;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }
  ${at(breakpoints.laptop_13)} {
    display: block;
    bottom: ${wrapper_padding.laptop};
  }
  [lang='ar'] & {
    right: 0;
    left: auto;
  }
`;

export const MenuInner = styled.div`
  padding-left: ${wrapper_padding.mobile};
  ${at(breakpoints.laptop_13)} {
    padding-left: ${wrapper_padding.laptop};
  }

  [lang='ar'] & {
    padding-right: ${wrapper_padding.mobile};
    padding-left: 0;
    ${at(breakpoints.laptop_13)} {
      padding-right: ${wrapper_padding.laptop};
      padding-left: 0;
    }
  }
`;
