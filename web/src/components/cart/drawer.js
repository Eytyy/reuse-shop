import React from 'react';

import {DrawerBackground, Drawer, CartHeader, CartTitle} from './cart.style';

import Cart from './';
import {useSiteState} from '../../context/siteContext';
import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import MultilineHeadline from '../multilineHeadline';
import {useCartItems} from '../../context/storeContext';

const CartDrawer = () => {
  const {cartIsOpen} = useSiteState();
  const [locale] = useLocale();
  const {lang} = usePageContext();
  const lineItems = useCartItems();
  const empty = lineItems?.length === 0;
  const title = empty
    ? locale?.cart_empty?.[lang]
    : locale?.cart_headline?.[lang];
  return (
    <>
      <DrawerBackground empty={empty} cartIsOpen={cartIsOpen} />
      <Drawer empty={empty} cartIsOpen={cartIsOpen}>
        <CartHeader empty={empty}>
          <CartTitle>
            <MultilineHeadline title={title} />
          </CartTitle>
        </CartHeader>
        <Cart empty={empty} />
      </Drawer>
    </>
  );
};

export default CartDrawer;
