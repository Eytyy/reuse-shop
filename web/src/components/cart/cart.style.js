import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
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
import {FormButton} from '../productForm/styles';

export const EmptyCartState = styled.div`
  font-size: 42px;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100%;
  svg {
    margin-left: 8px;
  }
`;

const CartDrawerBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  height: 100%;
  min-height: var(--app-height);
  width: 100%;
  width: ${(props) => (props.empty ? '33%' : '100%')};
  transform: ${({cartIsOpen}) =>
    cartIsOpen ? `translateX(0%)` : `translateX(-100%)`};
  transition: transform 200ms ease-in-out, opacity 300ms 100ms ease-in-out;
  opacity: ${({cartIsOpen}) => (cartIsOpen ? '1' : '0')};

  ${at(breakpoints.laptop_13)} {
    width: ${(props) => (props.empty ? '21%' : '50%')};
  }

  [lang='ar'] & {
    right: 0;
    left: auto;
    transform: ${({cartIsOpen}) =>
      cartIsOpen ? `translateX(0%)` : `translateX(100%)`};
  }
`;

export const DrawerBackground = styled(CartDrawerBox)`
  background: ${colors.base};
  z-index: 20;
`;

export const Drawer = styled(CartDrawerBox)`
  display: grid;
  grid-template-columns: ${(props) => (props.empty ? '1fr' : 'repeat(4, 1fr)')};
  grid-template-rows: ${(props) =>
    props.empty ? '80px auto' : '40px auto min-content'};
  grid-gap: ${gridGap.mobile};
  padding: ${wrapper_padding.mobile};
  color: ${colors.secondary};

  ${at(breakpoints.tablet)} {
    grid-template-columns: ${(props) =>
      props.empty ? '1fr' : 'repeat(3, 1fr)'};
    grid-template-rows: auto;
    gap: ${gridGap.tablet};
    padding: ${wrapper_padding.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    gap: ${gridGap.laptop};
    padding: ${wrapper_padding.laptop};
  }
`;

export const CartButton = styled.button`
  line-height: 1em;
  display: inline-flex;
  justify-content: flex-start;
  cursor: pointer;
`;

export const CloseCartButton = styled(CartButton)`
  display: inline-flex;
  font-size: 30px;
  margin-bottom: 9px;
  svg {
    margin: 0 0 0 -5px;
  }
  [lang='ar'] & {
    svg {
      margin: 0 -5px 0 0;
    }
  }
  ${at(breakpoints.tablet)} {
    grid-row: 2 / 3;
  }
  ${at(breakpoints.laptop_13)} {
    margin-bottom: 0px;
  }
`;

export const CartHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  grid-column: ${(props) => (props.empty ? '1 / 2' : '2 / 5')};
  grid-row: ${(props) => (props.empty ? '2 / 3' : '1 / 2')};
  ${at(breakpoints.tablet)} {
    grid-column: 1 / 2;
  }
`;

export const CartTitle = styled.h3`
  grid-column: 2/4;
  margin: 0;
  ${font_styles.display_2};
  color: hsl(156, 19%, 75%);
  font-size: 16px;
  line-height: 1.2;
  ${at(breakpoints.tablet)} {
    margin-top: ${`calc(${spacing.tablet} + ${headerHeight.tablet} )`};
  }
  ${at(breakpoints.laptop_13)} {
    margin-top: ${`calc(${spacing.laptop} + ${headerHeight.laptop} )`};
  }
`;

export const CartInnerContainer = styled.div`
  grid-column: 2 / 5;
  grid-row: 2 / 3;
  overflow: hidden;
  ${at(breakpoints.tablet)} {
    grid-column: 2 / 4;
    grid-row: 1 / 3;
  }
`;

export const CartContentWrapper = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 100%;
  margin: ${`0 -40px 0`};

  ${at(breakpoints.tablet)} {
    margin: 0 calc(-40px - 40px) 0;
  }
  ${at(breakpoints.laptop_13)} {
    margin: 0 calc(-72px - 40px) 0;
  }
`;

export const CartContent = styled.div`
  // hide scroll
  padding: 0 40px 0;
  ${at(breakpoints.laptop_13)} {
    padding: 0 calc(40px + 40px) 0;
  }
  ${at(breakpoints.laptop_13)} {
    padding: 0 calc(72px + 40px) 0;
  }
`;

export const CartSide = styled.div`
  grid-column: 1/2;
  grid-row: 2/4;
  align-self: flex-end;
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-rows: auto auto;
    gap: ${spacing.mobile};
  }
`;

export const RemoveItemButton = styled(CartButton)`
  font-size: 21px;
`;

export const QuantityButton = styled(CartButton)`
  font-size: 18px;
  color: #fff;
`;

export const CartStatus = styled.div``;

export const CartNext = styled.div`
  grid-column: 2/5;
  grid-row: 3/4;
  align-self: flex-end;
`;

export const CartNotes = styled.div`
  font-size: 9.5px;
  line-height: 1.3em;
  color: #fff;
  margin-bottom: 15px;
  display: grid;
  gap: ${`${spacing_base.default}px`};
  ${at(breakpoints.tablet)} {
    font-size: 14px;
    gap: 0px;
  }
`;

export const CartSubtotal = styled.div`
  font-size: 16px;
  .subtotal-label {
    color: #fff;
    margin-bottom: 4px;
  }
  .subotal-value {
  }
  ${at(breakpoints.tablet)} {
    font-size: 25px;
  }
`;

export const CheckoutButton = styled(FormButton)`
  width: 100%;
  grid-column: 1 / 3;
`;

export const ContinueShopping = styled.div`
  grid-column: ${(props) => (props.empty ? '1/2' : '1/5')};
  grid-row: ${(props) => (props.empty ? '3/4' : '3/4')};
  align-self: flex-end;
  ${at(breakpoints.tablet)} {
    grid-column: ${(props) => (props.empty ? '1/2' : '2/4')};
  }
`;
