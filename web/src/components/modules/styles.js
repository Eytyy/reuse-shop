import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {
  at,
  pad_content_from_top,
  pin_content_below_logo,
} from '../../styles/helpers';
import {font_styles} from '../../styles/typography';
import {
  breakpoints,
  colors,
  gridGap,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

export const SideHeaderColumn = styled.header`
  position: relative;
  h2 {
    ${font_styles.display_2}
    color: ${colors.base};
    display: none;
  }
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: ${gridGap.tablet};
    position: fixed;
    top: ${`calc(${wrapper_padding.tablet} + ${headerHeight.tablet})`};
    left: ${wrapper_padding.tablet};
    right: ${wrapper_padding.tablet};
    padding-top: ${spacing.tablet};
    opacity: ${({visible}) => (visible ? '1' : '0')};
    visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};

    transition: opacity 200ms linear;

    .is-scrollDisabled & {
      pointer-events: all;
    }
    .is-scrollEnabled & {
      pointer-events: none;
    }
    h2 {
      display: block;
    }
  }
  ${at(breakpoints.laptop_13)} {
    gap: ${gridGap.laptop};
    top: ${`calc(${wrapper_padding.laptop} + ${headerHeight.laptop})`};
    left: ${wrapper_padding.laptop};
    right: ${wrapper_padding.laptop};
    padding-top: ${spacing.laptop};
  }
`;

export const ModuleContentColumn = styled.div`
  position: relative;
  z-index: 3;
`;

export const ModuleBodyColumn = styled.div`
  ${font_styles.body}
`;

export const ModuleHeadline = styled.div`
  position: relative;
  ${pad_content_from_top.all}
  ${pin_content_below_logo}

  ${at(breakpoints.laptop_13)} {
    padding: 0 ${wrapper_padding.laptop};
    margin: 0 auto;

    position: fixed;
    left: 0;
    opacity: 0;
    transition: opacity 200ms ease-in-out;

    .is-scrollDisabled & {
      pointer-events: all;
    }
    .is-scrollEnabled & {
      pointer-events: none;
    }
    ${({visible}) =>
      visible &&
      css`
        opacity: 1;
      `}
  }
`;
