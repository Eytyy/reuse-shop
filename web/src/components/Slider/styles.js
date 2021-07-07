import styled from '@emotion/styled';
import {css} from '@emotion/react';
import {at} from '../../styles/helpers';
import {
  breakpoints,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

const visible = css`
  visibility: visible;
  opacity: 1;
`;

const hidden = css`
  visibility: hidden;
  opacity: 0;
`;

export const SliderWrapper = styled.div`
  position: relative;
  transition: height 200ms linear;
  max-height: ${`calc(var(--app-height) - (${headerHeight.mobile} * 2) - (${wrapper_padding.mobile} * 2))`};
  overflow: hidden;
  .inner {
    padding-top: 100%;
  }
  ${at(breakpoints.laptop_13)} {
    max-height: ${`calc(var(--app-height) - (${headerHeight.laptop} * 2) - (${wrapper_padding.laptop} * 2))`};
  }
`;

export const Slide = styled.div`
  ${({active}) => (active ? visible : hidden)}
  transition: 500ms ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  img {
    height: 100%;
    object-fit: cover;
  }
`;

const nav_style = css`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

export const Nav = styled.nav``;

export const Dots = styled.div`
  ${nav_style}
  text-align: right;
  width: 100%;
`;

export const Dot = styled.div`
  display: inline-block;
  transition: 1s linear;
  color: #fff;
  border: 1px solid #fff;
  background: ${({active}) => (active ? '#FFF' : 'transparent')};
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 0 15px 10px 0;
  cursor: pointer;
`;

export const SliderBtn = styled.button`
  position: absolute;
  top: 50%;
  color: #fff;
  border: 4px solid #fff;
  border-radius: 100%;
  font-size: 2.2em;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
`;

export const SliderBtnNext = styled(SliderBtn)`
  right: ${spacing.mobile};
`;

export const SliderBtnPrev = styled(SliderBtn)`
  left: ${spacing.mobile};
`;
