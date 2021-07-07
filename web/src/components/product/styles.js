import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {mobile_grid} from '../../styles/layout';
import {font_styles} from '../../styles/typography';
import {
  breakpoints,
  colors,
  gridGap,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';
import {LinkButton} from '../layout/styles';
import {SliderWrapper} from '../Slider/styles';

export const ProductPage = styled.article``;

export const ProductContent = styled.div`
  ${mobile_grid}
  padding: ${wrapper_padding.mobile};
  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: auto min-content;
    grid-gap: ${gridGap.laptop};
    height: var(--app-height);
  }
`;

export const ProductDetails = styled.div`
  position: fixed;
  top: ${`calc(${wrapper_padding.mobile} + ${headerHeight.mobile})`};
  left: ${wrapper_padding.mobile};
  right: ${wrapper_padding.mobile};

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${gridGap.mobile};
  padding-top: ${spacing.mobile};

  opacity: ${({visible}) => (visible ? '1' : '0')};
  z-index: ${({visible}) => (visible ? '1' : '-1')};
  visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};

  transition: opacity 200ms linear;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(6, 1fr);
    gap: ${gridGap.laptop};
    top: ${`calc(${wrapper_padding.laptop} + ${headerHeight.laptop})`};
    left: ${wrapper_padding.laptop};
    right: ${wrapper_padding.laptop};
    padding-top: ${spacing.laptop};
  }
`;

export const ProductGallery = styled.div`
  grid-column: 2/5;
  position: relative;
  padding-top: 100%;
  ${SliderWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 2/6;
    grid-row: 1/3;
    padding-top: 0;
    ${SliderWrapper} {
      position: initial;
    }
  }
`;

export const ProductDetailsItem = styled.div`
  color: ${colors.links};
  margin-bottom: 12px;
  text-transform: capitalize;
  .label {
    margin-bottom: 3px;
    text-decoration: underline;
  }
`;

export const DescriptionWrapper = styled.div`
  grid-column: 2/5;
  ${font_styles.category_desc}
  color: ${colors.secondary};
  ${at(breakpoints.laptop_13)} {
    margin-bottom: 0;
    grid-column: 6 / 7;
  }
`;

export const CostBreakdownWrapper = styled.div`
  ${font_styles.body}
  grid-column: 2 / 5;
  ${at(breakpoints.laptop_13)} {
    grid-column: 6 / 7;
  }
`;

export const CostBreakdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  &.headline {
    padding: 0 0 6px;
    margin: 0 0 9px;
    border-bottom: 1px solid currentColor;
  }
  &.total {
    padding: 6px 0;
    margin: 9px 0;
    border-top: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
  }
`;
export const RecommendedProductsWrapper = styled.aside`
  ${mobile_grid}
  padding: ${wrapper_padding.mobile};
  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
    grid-template-columns: repeat(6, 1fr);
    grid-gap: ${gridGap.laptop};
  }
`;

export const BreakdownLink = styled(LinkButton)`
  padding: 0 0 6px;
  color: ${colors.base};
  font-size: 1em;
  ${at(breakpoints.laptop_13)} {
    font-size: 1em;
    padding: 0 0 6px;
  }
`;
