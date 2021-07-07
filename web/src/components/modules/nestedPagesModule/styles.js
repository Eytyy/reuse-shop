import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {at} from '../../../styles/helpers';
import {mobile_grid} from '../../../styles/layout';
import {font_styles} from '../../../styles/typography';
import {
  breakpoints,
  colors,
  gridGap,
  spacing,
  wrapper_padding,
} from '../../../styles/vars';
import {SideHeaderColumn} from '../styles';

export const Wrapper = styled.div`
  ${mobile_grid}
  padding: ${wrapper_padding.mobile};

  ${at(breakpoints.laptop_13)} {
    display: block;
    padding: 0;
  }
`;
export const HeadlineColumn = styled(SideHeaderColumn)``;

export const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  grid-column: 2 / 5;

  ${at(breakpoints.tablet)} {
    padding: 0 ${wrapper_padding.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    display: grid;
    gap: ${gridGap.laptop};
    padding: ${wrapper_padding.laptop};
    grid-template-columns: repeat(6, 1fr);
    ${HeadlineColumn} {
      grid-column: 1 / 2;
    }
  }
`;

export const NestedPages = styled.div`
  position: relative;
  z-index: 3;
  min-height: var(--app-height);
  grid-column: 2 / 5;
  .filterIsOpen & {
    z-index: 1;
  }

  ${at(breakpoints.laptop_13)} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${gridGap.laptop};
    grid-column: 2 / 6;
  }
  /* ${at(breakpoints.desktop)} {
    grid-template-columns: repeat(4, 1fr);
  } */
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

export const NestedPage = styled.div`
  margin-bottom: ${({last}) => (last ? '0px' : `${spacing.mobile}`)};
  ${at(breakpoints.tablet)} {
    margin-bottom: 0;
  }
`;

export const DescriptionWrapper = styled.div`
  grid-column: 2 / 5;
  grid-row: 1;
  margin-bottom: ${spacing.mobile};
  ${font_styles.category_desc};
  ${at(breakpoints.laptop_13)} {
    grid-column: 6 / 7;
  }
`;

export const NestedPageTitle = styled.h2`
  ${font_styles.block_title};
  color: ${colors.base};
  margin: 9px 0 0;
`;
