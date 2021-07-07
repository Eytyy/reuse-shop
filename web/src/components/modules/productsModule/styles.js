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

export const HeadlineColumn = styled(SideHeaderColumn)``;

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

export const Wrapper = styled.div`
  ${mobile_grid}
  padding: ${wrapper_padding.mobile};

  ${at(breakpoints.tablet)} {
    padding: ${wrapper_padding.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    display: block;
    padding: 0;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  grid-column: 2 / 5;

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

export const Products = styled.div`
  position: relative;
  z-index: 2;

  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 2 / 6;
    gap: ${gridGap.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    grid-row: 1;
    gap: ${gridGap.laptop};
  }
`;

export const DescriptionWrapper = styled.div`
  ${font_styles.category_desc}
  color: ${colors.secondary};
  margin-bottom: ${spacing.mobile};
  ${at(breakpoints.laptop_13)} {
    margin-bottom: 0;
    grid-column: 6 / 7;
  }
`;
