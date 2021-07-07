import React from 'react';

import {useToggleCart} from '../../context/siteContext';
import {
  useCartItems,
  useCartTotals,
  useCheckout,
} from '../../context/storeContext';

import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import CartItem from './item';
import {
  CartContentWrapper,
  CartContent,
  CartSide,
  CheckoutButton,
  ContinueShopping,
  CartStatus,
  CartNotes,
  CartSubtotal,
  CartNext,
  CloseCartButton,
  CartInnerContainer,
} from './cart.style';
import {MdClose} from 'react-icons/md';
import Price from '../price';

const Cart = ({empty = false}) => {
  const lineItems = useCartItems();
  const openCheckout = useCheckout();
  const toggleCart = useToggleCart();
  const {total} = useCartTotals();
  const [locale] = useLocale();
  const {lang} = usePageContext();
  return (
    <>
      {!empty && (
        <>
          <CartInnerContainer>
            <CartContentWrapper>
              <CartContent>
                {lineItems?.map((item, index) => (
                  <CartItem
                    key={item.id + item.quantity}
                    {...item}
                    last={index === lineItems.length - 1}
                  />
                ))}
              </CartContent>
            </CartContentWrapper>
          </CartInnerContainer>
          <CartNext>
            <CheckoutButton onClick={openCheckout}>
              <span>{locale?.['cart_checkout']?.[lang]}</span>
              {lang === 'ar' ? (
                <span className='btn-icon'>
                  <BsArrowLeft />
                </span>
              ) : (
                <span className='btn-icon'>
                  <BsArrowRight />
                </span>
              )}
            </CheckoutButton>
          </CartNext>
          <CartSide>
            <CloseCartButton onClick={toggleCart}>
              <MdClose />
            </CloseCartButton>
            <CartStatus>
              <CartNotes>
                <span>{locale?.['cart_notice_1']?.[lang]}</span>
                <span>{locale?.['cart_notice_2']?.[lang]}</span>
              </CartNotes>
              <CartSubtotal>
                <div className='subtotal-label'>
                  {locale?.['cart_subtotal']?.[lang]}
                </div>
                <div className='subotal-value'>
                  {(total && <Price price={total} />) || '-'}
                </div>
              </CartSubtotal>
            </CartStatus>
          </CartSide>
        </>
      )}
      {lineItems.length === 0 && (
        <ContinueShopping empty={empty} onClick={toggleCart}>
          <CloseCartButton>
            <MdClose />
          </CloseCartButton>
        </ContinueShopping>
      )}
    </>
  );
};

export default Cart;
