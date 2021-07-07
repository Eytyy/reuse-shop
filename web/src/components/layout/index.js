import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useStaticQuery, graphql} from 'gatsby';
import {debounce} from 'lodash';

import {useLocale} from '../../context/localeProvider';
import {useSectionsContext} from '../../context/sectionsContext';
import {usePageContext} from '../../context/pageContext';
import {
  useAddProducts,
  useCloseCartAndMenu,
  useSiteState,
} from '../../context/siteContext';

import Header from '../header';
import Navigation from '../navigation';
import CartDrawer from '../cart/drawer';

import {GlobalStyles, Container, LoadingWrapper} from './styles';
import Logo from '../Logo';

export const query = graphql`
  query siteQuery {
    settings: sanitySiteSettings(_id: {eq: "settings"}) {
      phone
      google_map
      listId: klaviyo_newslettertId
    }
    mainMenu: sanityMenu(title: {eq: "Main"}) {
      menuItems: _rawLinks(resolveReferences: {maxDepth: 2})
    }
    shopLocale: sanityShopLocale(_id: {eq: "shopLocale"}) {
      adding: _rawAdding
      addToCart: _rawAddtocart
      cart_headline: _rawCartHeadline
      cart_checkout: _rawCartCheckout
      cart_continue: _rawCartContine
      cart_empty: _rawCartEmpty
      cart_notice_1: _rawCartNotice1
      cart_notice_2: _rawCartNotice2
      cart_subtotal: _rawCartSubtotal
      jod: _rawJod
      nostock: _rawNostock
      preorder: _rawPreorder
      usd: _rawUsd
      waitlistbutton: _rawWaitlistbutton
      waitlistmessage: _rawWaitlistmessage
      filtersLabel: _rawFiltersLabel
      filtersClear: _rawFiltersClear
    }
    siteLocale: sanitySiteLocale(_id: {eq: "siteLocale"}) {
      email: _rawEmail
      language: _rawLanguage
      more: _rawMore
      title_1: _rawTitle1
      title_2: _rawTitle2
      newsletter_btn_text: _rawNewsletterBtnText
      newsletter_success: _rawNewsletterSuccess
    }
    productLocale: sanityProductLocale(_id: {eq: "productLocale"}) {
      breakdown: _rawBreakdown
      category: _rawCategory
      colour: _rawColour
      maker: _rawMaker
      material: _rawMaterial
      size: _rawSize
    }
    products: allSanityProduct(
      filter: {deleted: {ne: true}, main: {slug: {current: {ne: null}}}}
    ) {
      nodes {
        id
        defaultPrice
        allVariants: _rawVariants(resolveReferences: {maxDepth: 10})
        variants {
          variantId
        }
        main: _rawMain(resolveReferences: {maxDepth: 10})
      }
    }
  }
`;

const Layout = ({children, location}) => {
  const data = useStaticQuery(query);

  const [loading, setLoading] = useState(true);
  const {cartIsOpen, menuIsOpen, filterIsOpen} = useSiteState();
  const {getActiveSectionInfo, scrollCallback} = useSectionsContext();

  const {lang} = usePageContext();
  const [, setLocale] = useLocale();
  const addProducts = useAddProducts();
  const currentLang = useRef(lang);

  const containerRef = useRef();
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [pastHeaderArea, setPastHeaderArea] = useState(false);
  const activeSectionInfo = getActiveSectionInfo() || {};
  const closeCartAndMenu = useCloseCartAndMenu();

  useEffect(() => {
    const {shopLocale, siteLocale, productLocale} = data;
    setLocale((prevLocale) => ({
      ...prevLocale,
      ...shopLocale,
      ...siteLocale,
      ...productLocale,
    }));
    setLoading(false);
  }, []);

  useEffect(() => {
    addProducts(data.products);
  }, [data.products]);

  useEffect(() => {
    if (cartIsOpen || menuIsOpen || filterIsOpen) {
      if (cartIsOpen) {
        document.body.classList.add('lockViewport', 'cartIsOpen');
      } else if (filterIsOpen) {
        document.body.classList.add('lockViewport', 'filterIsOpen');
      } else {
        document.body.classList.add('lockViewport');
      }
    } else {
      document.body.classList.remove('cartIsOpen');
      document.body.classList.remove('lockViewport');
    }
  }, [cartIsOpen, menuIsOpen, filterIsOpen]);

  const locationRef = useRef(location?.pathname);
  useEffect(() => {
    if (locationRef.current !== location?.pathname) {
      locationRef.current = location?.pathname;
      closeCartAndMenu();
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location?.pathname]);

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    appHeight();

    window.addEventListener('resize', appHeight);
    return function cleanup() {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  useEffect(() => {
    function showLoading() {
      setLoading(true);
    }
    function hideLoading() {
      setLoading(false);
    }

    if (currentLang.current !== lang) {
      currentLang.current = lang;
      showLoading();
      setTimeout(hideLoading, 500);
    }
    return function cleanup() {
      clearTimeout(hideLoading);
    };
  }, [lang]);

  const handleScroll = useCallback(() => {
    debounce(() => {
      scrollCallback(containerRef.current.scrollTop);
    }, 10)();
  }, [scrollCallback]);

  const enableScroll = useCallback((e) => {
    e.persist();
    if (containerRef.current.scrollTop >= window.innerHeight) {
      setPastHeaderArea(true);
      setScrollEnabled(true);
      return false;
    }
    setPastHeaderArea(false);
    setScrollEnabled(true);
    debounce(() => {
      setScrollEnabled(false);
    }, 500)();
  }, []);

  return (
    <>
      <GlobalStyles theme='default' />
      <div
        onWheel={enableScroll}
        onTouchMove={enableScroll}
        className={`site-wrapper ${
          !pastHeaderArea
            ? scrollEnabled
              ? 'is-scrollEnabled'
              : 'is-scrollDisabled'
            : ''
        }`}
      >
        <Header activeSectionInfo={activeSectionInfo} />
        <LoadingWrapper visible={loading}>
          <Logo />
        </LoadingWrapper>
        {data?.mainMenu?.menuItems && (
          <Navigation
            activeSectionInfo={activeSectionInfo}
            menuItems={data.mainMenu.menuItems}
          />
        )}
        <CartDrawer />
        <Container onScroll={handleScroll} visible={loading} ref={containerRef}>
          {children}
        </Container>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
