import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {breakpoints, colors, fonts} from '../../styles/vars';

export const MainMenu = styled.nav`
  a {
    color: ${({linksColor}) => linksColor || colors.base};
    display: block;
  }
`;

export const MainMenuItem = styled.div`
  display: block;
  margin-bottom: 9px;
`;

export const nav_btn_styles = css`
  font-size: 27px;
  line-height: 1em;
  color: ${colors.base};
  cursor: pointer;
  padding: 0;
  [lang='ar'] & {
    font-size: 27px;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 24px;
    [lang='ar'] & {
      font-size: 24px;
    }
  }
`;

export const NavIcon = styled.div`
  ${nav_btn_styles}
  color: ${({linksColor}) => linksColor || colors.base};
  transition: color 200ms linear;
  display: flex;
  justify-content: center;
`;

export const CurrencyButton = styled(NavIcon)`
  font-size: 18px;
  [lang='ar'] & {
    font-size: 18px;
    transform: translate(0, 5px);
    align-self: baseline;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 21px;
    [lang='ar'] & {
      font-size: 21px;
    }
  }
`;

export const LanguageButton = styled(NavIcon)`
  font-size: 24px;
  margin-bottom: 6px;
  [lang='ar'] & {
    margin-bottom: 0px;
    font-size: 24px;
    font-family: ${fonts.en};
  }
  ${at(breakpoints.laptop_13)} {
    margin-bottom: 0;
    font-size: 21px;
    [lang='ar'] & {
      font-size: 21px;
    }
  }
`;

export const CartToggleButton = styled.button`
  ${nav_btn_styles}
  position: relative;
  color: ${({linksColor}) => linksColor || colors.base};
  transition: color 200ms linear;
`;

export const CartDot = styled.span`
  width: 5px;
  height: 5px;
  display: block;
  background: ${colors.links};
  border-radius: 100%;
  position: absolute;
  right: 0px;
  top: 0;
`;

export const ShopNavWrapper = styled.nav`
  display: grid;
  grid-template-rows: repeat(4, 1fr);

  align-items: center;
  gap: 10px;
  margin-top: 10px;
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(4, 30px);
    grid-template-rows: auto;
    flex-direction: row;
    margin-top: 24px;
    [lang='ar'] & {
      grid-template-columns: repeat(3, 30px) 45px;
    }
  }
`;
