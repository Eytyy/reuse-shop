import React from 'react';
import {Link} from 'gatsby';
import {AiOutlineUser, AiOutlineShopping} from 'react-icons/ai';

import {useSiteState, useToggleCart} from '../../context/siteContext';
import {usePageContext} from '../../context/pageContext';
import {
  useCartCount,
  useStore,
  useSwitchCurrency,
} from '../../context/storeContext';

import {
  CartDot,
  CartToggleButton,
  NavIcon,
  ShopNavWrapper,
  CurrencyButton,
  LanguageButton,
} from './styles';
import {colors} from '../../styles/vars';
import {getLinksColor} from '../../lib/helpers';
import {useLocale} from '../../context/localeProvider';

const ShopNavigation = ({activeSectionInfo}) => {
  const count = useCartCount();
  const toggleCart = useToggleCart();

  const {lang, alternateLinks} = usePageContext();
  const langLink = alternateLinks?.find((link) => link.lang !== lang);
  const switchCurrency = useSwitchCurrency();
  const {currency} = useStore();
  const {menuIsOpen} = useSiteState();

  const [locale] = useLocale();

  const linksColor = menuIsOpen
    ? colors.base
    : getLinksColor(activeSectionInfo?.type)?.main;

  return (
    <ShopNavWrapper>
      <CartToggleButton linksColor={linksColor} onClick={toggleCart}>
        <AiOutlineShopping />
        {count > 0 && <CartDot />}
      </CartToggleButton>

      <a href='https://headless-eytyy.myshopify.com/account'>
        <NavIcon linksColor={linksColor}>
          <AiOutlineUser />
        </NavIcon>
      </a>

      {langLink && (
        <Link to={langLink.path}>
          <LanguageButton linksColor={linksColor}>
            {lang === 'ar' ? 'En' : 'ع'}
          </LanguageButton>
        </Link>
      )}

      <CurrencyButton linksColor={linksColor} onClick={switchCurrency}>
        {currency === 'usd' ? locale?.usd?.[lang] : locale?.jod?.[lang]}
      </CurrencyButton>
    </ShopNavWrapper>
  );
};

export default ShopNavigation;
