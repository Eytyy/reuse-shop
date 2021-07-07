import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {breakpoints, colors, gridGap, spacing} from '../../styles/vars';
import {Selector} from '../quantitySelector/styles';
import {RemoveItemButton} from './cart.style';

export const Item = styled.div`
  margin-bottom: ${({last}) => (last ? '0px' : spacing.mobile)};
  padding-bottom: ${({last}) => (last ? spacing.mobile : '0')};
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: ${gridGap.laptop};
    margin-bottom: ${({last}) => (last ? '0px' : spacing.tablet)};
    padding-bottom: ${({last}) => (last ? '50%' : '0')};
  }
`;

export const ItemContent = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .cart_item_link {
    text-decoration: none;
  }
  ${at(breakpoints.tablet)} {
    display: grid;
    grid: ${gridGap.tablet};
    grid-template-rows: auto min-content;
  }
`;

export const ItemContentTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 100%;
  padding-bottom: 24px;
  .variant_info {
    margin: 0 0 9px;
  }
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-gap: 15px;
    padding-bottom: 0;
    .variant_info {
      margin: 0;
    }
  }
`;

export const ItemTitle = styled.h4`
  font-size: 16px;
  margin: 12px 0 9px;
  color: #fff;
  ${at(breakpoints.laptop_13)} {
    margin: 0;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: auto;
  margin: 0;
  display: block;
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${colors.links};
  padding-top: 9px;
  ${RemoveItemButton} {
    align-self: flex-end;
    margin: 0px 0px 0px 15px;
    [lang='ar'] & {
      margin: 0px 15px 0px 0px;
    }
  }
  ${Selector} {
    padding: 0%;
    border-bottom: 0px;
  }
`;

export const Quantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityValue = styled.span`
  margin: 0 8px;
`;

export const ItemPrice = styled.div`
  color: ${colors.secondary};
  .curr {
    margin-right: 3px;
  }
  .current-price {
    display: flex;
    [lang='ar'] & {
      justify-content: flex-end;
      flex-direction: row-reverse;
    }
  }
  .original-price {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .sep {
    margin: 0 4px;
  }
`;
