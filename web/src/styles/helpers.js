import {css} from '@emotion/react';
import {breakpoints, headerHeight, spacing} from './vars';

export const at = (breakpoint) => `@media (min-width: ${breakpoint}px)`;

export const pad_content_from_top = css`
  padding-top: ${`calc(${headerHeight.mobile} + ${spacing.mobile})`};

  ${at(breakpoints.tablet)} {
    padding-top: ${`calc(${headerHeight.tablet} + ${spacing.tablet})`};
  }
  ${at(breakpoints.laptop_13)} {
    padding-top: ${`calc(${headerHeight.laptop} + ${spacing.laptop})`};
  }
`;

export const pin_content_below_logo = css`
  top: ${`calc(${headerHeight.mobile} + ${spacing.mobile})`};
  ${at(breakpoints.tablet)} {
    top: ${`calc(${headerHeight.tablet} + ${spacing.tablet})`};
  }
  ${at(breakpoints.laptop)} {
    top: ${`calc(${headerHeight.laptop} + ${spacing.laptop})`};
  }
`;
