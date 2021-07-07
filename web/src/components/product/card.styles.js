import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {font_styles} from '../../styles/typography';
import {breakpoints, colors, fonts, spacing} from '../../styles/vars';
import {FormButtonGroup} from '../productForm/styles';

export const ProductCardWrapper = styled.div`
  margin-bottom: ${({last}) => (last ? '0px' : `${spacing.mobile}`)};
  display: grid;
  grid-template-rows: min-content;
  height: 100%;

  img {
    display: block;
  }

  .link-wrapper {
    display: block;
  }

  ${FormButtonGroup} {
    grid-template-columns: 1fr;
    gap: 0;
  }
  button:disabled {
    display: none;
  }
  ${at(breakpoints.tablet)} {
    margin-bottom: 0;
  }
`;

export const ProductCardTitle = styled.h2`
  font-size: 1em;
  color: ${colors.base};
  margin: 9px 0 0;
  [lang='ar'] & {
    margin: 15px 0 0;
  }
`;

export const ProductPrice = styled.div`
  ${font_styles.block_title};
  color: ${colors.secondary};
`;

export const ProductCardContent = styled.div`
  ${font_styles.block_title};
  /* min-height: 3.33333em; */

  ${at(breakpoints.desktop)} {
    min-height: auto;
  }
`;

export const ProductActionsWrapper = styled.div`
  margin-top: 9px;
  align-self: flex-end;
`;

export const AddToCartBtn = styled.button``;
