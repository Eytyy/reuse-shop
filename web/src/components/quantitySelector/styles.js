import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {fonts} from '../../styles/vars';
import {CartButton} from '../cart/cart.style';
import {button_styles} from '../layout/styles';

export const Selector = styled.div`
  ${button_styles}
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  position: relative;
  ${(props) =>
    props.disabled &&
    css`
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    `}
`;

export const QuantityValue = styled.span`
  font-family: ${fonts.en};
  margin: 0 15px;
`;

export const QuantityButton = styled(CartButton)`
  font-size: 18px;
  color: #fff;
`;
