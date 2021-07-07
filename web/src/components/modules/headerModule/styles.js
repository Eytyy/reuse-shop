import styled from '@emotion/styled';
import {at, pad_content_from_top} from '../../../styles/helpers';
import {mobile_grid} from '../../../styles/layout';

import {font_styles} from '../../../styles/typography';

import {
  breakpoints,
  colors,
  gridGap,
  spacing_base,
  wrapper_padding,
} from '../../../styles/vars';
import {IdleFormStatus} from '../../productForm/styles';
import {Selector} from '../../quantitySelector/styles';

export const Header = styled.header`
  background-color: ${colors.secondary};
  height: var(--app-height);
  position: relative;

  button,
  select,
  ${Selector}, ${IdleFormStatus} {
    color: ${colors.base};
  }
  .spacer {
    position: relative;
    height: 100%;
  }
`;

export const HeaderInner = styled.div`
  ${mobile_grid}
  position: ${(props) => (props.location === 'default' ? 'fixed' : 'relative')};
  bottom: ${(props) => (props.location === 'default' ? '0' : 'auto')};

  padding: ${wrapper_padding.mobile};
  width: 100%;
  height: 100%;
  grid-template-rows: max-content 1fr;

  transition: opacity 200ms linear;
  opacity: ${(props) => props.transparency};
  .is-scrollDisabled & {
    pointer-events: all;
  }

  .is-scrollEnabled & {
    pointer-events: none;
  }

  ${at(breakpoints.tablet)} {
    padding: ${wrapper_padding.tablet};
    gap: ${`calc(${gridGap.tablet} * 2)`} ${gridGap.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    gap: ${`calc(${gridGap.laptop} * 2)`} ${gridGap.laptop};
    padding: ${wrapper_padding.laptop};
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const HeaderContentWrapper = styled.div`
  ${pad_content_from_top}
  grid-column: 1 / 5;
  position: relative;
  z-index: 2;

  ${at(breakpoints.laptop_13)} {
    grid-column: 1 / 2;
  }
`;

export const HeaderContent = styled.div`
  ${at(breakpoints.laptop_13)} {
    padding-right: ${`${spacing_base.laptop * 2}px`};

    [lang='ar'] & {
      padding-left: ${`${spacing_base.laptop * 2}px`};
      padding-right: 0;
    }
  }
`;

export const PageHeadline = styled.div`
  ${font_styles.display_1}
  p {
    margin: 0;
  }
`;

export const PageDescription = styled.div`
  font-size: ${font_styles.body};
  color: ${colors.base};
  margin-top: 21px;
  p {
    margin: 1.3em 0;
  }
`;

export const PageMainImage = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  grid-column: 2 / 5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 2 / 4;
  }
`;

export const LogoWrapper = styled.div`
  width: 155px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  display: none;

  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  ${at(breakpoints.laptop_13)} {
    display: block;
  }
`;
