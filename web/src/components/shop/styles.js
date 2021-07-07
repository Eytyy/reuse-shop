import styled from '@emotion/styled';
import {at, rest_form_el_style} from '../../styles/helpers';
import {font_styles} from '../../styles/typography';
import {
  breakpoints,
  colors,
  gridGap,
  headerHeight,
  spacing,
  spacing_base,
  wrapper_padding,
} from '../../styles/vars';
import {
  Header,
  HeaderContentWrapper,
  HeaderInner,
  PageHeadline,
  PageMainImage,
} from '../modules/headerModule/styles';

export const ShopWrapper = styled.div`
  position: relative;
  background: #fff;
  padding: 0 ${wrapper_padding.mobile};
  min-height: var(--app-height);
  ${at(breakpoints.tablet)} {
    padding: 0 ${wrapper_padding.tablet};
  }
  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
  }
`;

export const ShopContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${gridGap.mobile};
  padding-top: ${wrapper_padding.mobile};
  .filterIsOpen & {
    z-index: 12;
  }
  ${at(breakpoints.laptop_13)} {
    display: grid;
    gap: ${gridGap.laptop};
    grid-template-columns: repeat(6, 1fr);
    padding-top: 0px;
  }
`;

export const ShopHeader = styled(Header)``;

export const ShopHeaderInner = styled(HeaderInner)``;

export const ShopHeaderContentWrapper = styled(HeaderContentWrapper)``;

export const ShopHeadline = styled(PageHeadline)``;

export const ShopMainImage = styled(PageMainImage)``;

export const ShopTitle = styled.h2`
  display: none;
  ${at(breakpoints.laptop_13)} {
    display: block;
  }
`;

export const ShopNavCol = styled.div`
  grid-column: 1 / 2;
  opacity: ${({inViewport}) => (inViewport ? '1' : 0)};
  visibility: ${({inViewport}) => (inViewport ? 'visible' : 'hidden')};
  transition: opacity 200ms linear;
  color: ${colors.links};
  position: relative;

  h2 {
    ${font_styles.display_2}
    color: ${colors.secondary};
    margin: 0;
  }

  ${ShopTitle} {
    margin-bottom: ${`${spacing_base.default * 4}px`};
    text-transform: capitalize;
  }

  .filterIsOpen & {
    z-index: 2;
  }
`;

export const ShopNavColInner = styled.div`
  position: fixed;
  top: ${`calc(${wrapper_padding.mobile} + ${headerHeight.mobile})`};
  left: ${wrapper_padding.mobile};
  padding: ${spacing.mobile} ${gridGap.mobile} 0 0;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }
  ${at(breakpoints.tablet)} {
    padding-right: 0;
  }
  ${at(breakpoints.laptop_13)} {
    display: grid;
    grid-template-rows: min-content min-content auto;
    top: ${`calc(${wrapper_padding.laptop} + ${headerHeight.laptop})`};
    bottom: ${(props) => `${props.desktopNavColBottom}px`};
    left: ${wrapper_padding.laptop};
    padding-top: ${spacing.laptop};
    overflow: hidden;
    width: calc(16.666673% - 60px);
    max-width: 200px;

    &:after {
      content: '';
      display: block;
      background: rgba(255, 255, 255, 0.6);
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 21px;
    }
  }
  [lang='ar'] & {
    padding: ${spacing.mobile} 0 0 ${gridGap.mobile};
    right: ${wrapper_padding.mobile};
    left: auto;

    ${at(breakpoints.laptop_13)} {
      right: ${wrapper_padding.laptop};
      left: auto;
    }
  }
`;

export const ShopTypeNav = styled.div`
  position: relative;
  z-index: 12;
  .divider {
    width: 100%;
    border-bottom: 1px solid currentColor;
    margin: 0 0 ${`${spacing_base.default}px`};
    padding: 0 0 ${`${spacing_base.default}px`};
  }
  margin-bottom: ${spacing.mobile};
  button {
    font-size: 1em;
    padding: 0;
  }
  ${at(breakpoints.laptop_13)} {
    display: flex;
    align-items: center;
    margin: 0 0 0;
    .divider {
      width: 1px;
      border-right: 1px solid currentColor;
      border-bottom: none;
      height: 18px;
      margin: 0 9px;
    }
  }
`;

export const ShopTypeButton = styled.button`
  ${rest_form_el_style}
  text-transform: capitalize;
  cursor: pointer;
  outline: none;
  box-shadow: none;
  opacity: 0.5;
  transition: opacity 200ms linear;
  &.active {
    opacity: 1;
  }
`;

export const SortingFiltersWrapper = styled.div``;

export const ShopDescCol = styled.div`
  grid-column: 2 / 5;
  grid-row: 1;
  margin-bottom: ${spacing.mobile};
  ${font_styles.category_desc};
  ${at(breakpoints.laptop_13)} {
    grid-column: 6 / 7;
  }
`;

export const ProductsList = styled.div`
  position: relative;

  z-index: 3;
  grid-column: 2 / 5;
  .filterIsOpen & {
    z-index: 1;
  }
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: min-content;
    grid-gap: ${gridGap.tablet};
    grid-column: 2 / 6;
  }

  ${at(breakpoints.laptop_13)} {
    grid-gap: ${gridGap.laptop};
  }
  ${at(breakpoints.desktop)} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const EmptyState = styled(ProductsList)``;

export const ProductsListItem = styled.div``;

export const Description = styled.div`
  color: ${colors.secondary};
`;
