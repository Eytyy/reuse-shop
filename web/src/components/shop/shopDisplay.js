import React, {useLayoutEffect, useRef} from 'react';
import {usePageContext} from '../../context/pageContext';

import ProductCard from '../product/card';

import HeaderModule from '../modules/headerModule';
import Filters from '../filters';
import {useSiteState, useToggleFilters} from '../../context/siteContext';

import {useSectionsContext} from '../../context/sectionsContext';
import SectionObserver from '../sectionObserver';
import {useLocale} from '../../context/localeProvider';

import MultilineHeadline from '../multilineHeadline';
import {MobileFiltersToggle} from '../filters/styles';
import {MdClose, MdFilterList} from 'react-icons/md';

import {
  ShopWrapper,
  ShopContentWrapper,
  ProductsList,
  ProductsListItem,
  ShopNavCol,
  ShopNavColInner,
  ShopTypeNav,
  ShopDescCol,
  Description,
  ShopTitle,
  ShopTypeButton,
  EmptyState,
} from './styles';
import {breakpoints} from '../../styles/vars';

const ShopDisplay = ({
  headline,
  description,
  image,
  setType,
  type,
  visibleContent,
  sortProducts,
  updatePriceFilter,
  updateFilters,
  isFiltersActive,
  clearFilters,
  filters,
  title,
}) => {
  const {lang} = usePageContext();
  const [locale] = useLocale();

  const {filterIsOpen} = useSiteState();
  const {getActiveSectionInfo, headerHeight} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();

  const inViewport = activeSectionId === 'shop';

  const toggleFilters = useToggleFilters();
  const productsRef = useRef();
  const offset = useRef(0);

  useLayoutEffect(() => {
    const ww = window.innerWidth;
    if (ww >= breakpoints.laptop_13) {
      offset.current = 72;
    } else if (ww >= breakpoints.tablet) {
      offset.current = headerHeight;
    } else {
      offset.current = headerHeight - 30;
    }
  }, [headerHeight]);

  function scrollToProductsWrapper() {
    if (typeof window === 'undefined' || !productsRef.current) return;

    window.scrollTo({
      top:
        productsRef.current.getBoundingClientRect().top +
        window.scrollY -
        offset.current,
      behavior: 'smooth',
    });
  }

  const {navWhereabouts} = useSectionsContext();
  const desktopNavColBottom =
    typeof window !== 'undefined'
      ? window.innerHeight - navWhereabouts
      : 'auto';

  return (
    <>
      <HeaderModule title={headline} image={image} />
      <SectionObserver title={title} id='shop'>
        <ShopWrapper>
          <ShopContentWrapper>
            <ShopNavCol inViewport={inViewport}>
              <ShopNavColInner
                desktopNavColBottom={desktopNavColBottom}
                inViewport={inViewport}
              >
                <ShopTitle>
                  <MultilineHeadline title={locale?.[type]?.[lang]} />
                </ShopTitle>

                <ShopTypeNav>
                  <ShopTypeButton
                    type='button'
                    className={type === 'creations' ? 'active' : ''}
                    onClick={() => {
                      scrollToProductsWrapper();
                      setType('creations');
                    }}
                  >
                    <MultilineHeadline
                      dontBreak
                      as='span'
                      title={
                        locale?.creationsNav?.[lang] || locale?.creationsNav?.en
                      }
                    />
                  </ShopTypeButton>
                  <div className='divider' />
                  <ShopTypeButton
                    type='button'
                    className={type === 'curations' ? 'active' : ''}
                    onClick={() => {
                      scrollToProductsWrapper();
                      setType('curations');
                    }}
                  >
                    <MultilineHeadline
                      dontBreak
                      as='span'
                      title={
                        locale?.curationsNav?.[lang] || locale?.curationsNav?.en
                      }
                    />
                  </ShopTypeButton>
                </ShopTypeNav>

                <MobileFiltersToggle onClick={toggleFilters}>
                  <span>{locale?.filtersLabel?.[lang] || 'Filters'}</span>{' '}
                  {filterIsOpen ? <MdClose /> : <MdFilterList />}
                </MobileFiltersToggle>
                <Filters
                  clearLabel={locale.filtersClear?.[lang]}
                  filters={filters}
                  clearFilters={clearFilters}
                  isFiltersActive={isFiltersActive}
                  visible={filterIsOpen}
                  sortProducts={(e) => {
                    sortProducts(e);
                    scrollToProductsWrapper();
                  }}
                  updatePriceFilter={(e) => {
                    updatePriceFilter(e);
                    scrollToProductsWrapper();
                  }}
                  updateFilters={(e) => {
                    updateFilters(e);
                    scrollToProductsWrapper();
                  }}
                />
              </ShopNavColInner>
            </ShopNavCol>

            {visibleContent?.length > 0 ? (
              <ProductsList ref={productsRef}>
                {visibleContent.map(({id, ...rest}) => (
                  <ProductsListItem key={id}>
                    <ProductCard {...rest} />
                  </ProductsListItem>
                ))}
              </ProductsList>
            ) : (
              <EmptyState>
                {lang === 'en' ? 'No results' : 'لا توجد نتائج'}
              </EmptyState>
            )}

            <ShopDescCol>
              <Description>{description[lang]}</Description>
            </ShopDescCol>
          </ShopContentWrapper>
        </ShopWrapper>
      </SectionObserver>
    </>
  );
};

export default ShopDisplay;
