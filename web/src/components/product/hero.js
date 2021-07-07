import React from 'react';
import {usePageContext} from '../../context/pageContext';
import SectionObserver from '../sectionObserver';
import {useSectionInfo} from '../../context/sectionsContext';

import Figure from '../media/figure';
import Price from '../price';
import Logo from '../Logo';

import {
  Header,
  HeaderContent,
  HeaderContentWrapper,
  HeaderInner,
  LogoWrapper,
} from '../modules/headerModule/styles';
import {HeadlineWrapper, MainImage, Title} from './hero.styles';
import ProductForm from '../productForm';

const ProductHero = ({id, main, price, setPrice}) => {
  const {title, mainImage, slug} = main;
  const {lang} = usePageContext();
  const heroId = `${id}-header`;

  const {inboundScroll, scrollPosition, visible} = useSectionInfo(heroId);

  function getTransparency(multiplier = 1) {
    if (!visible) return 0;

    if (scrollPosition === 0) {
      return 1;
    } else {
      return ((100 - inboundScroll * multiplier) / 100).toFixed(2);
    }
  }

  const transparency = getTransparency(1.5);

  return (
    <SectionObserver type='headerModule' id={heroId}>
      <Header>
        <div className='spacer'></div>
        <HeaderInner transparency={transparency} location='default'>
          <HeaderContentWrapper>
            <HeaderContent>
              <HeadlineWrapper>
                <Title>{title[lang]}</Title>
                <Price price={price} />
              </HeadlineWrapper>
              <ProductForm
                product={main}
                location='hero'
                setPrice={setPrice}
                handle={slug.current}
                waitlist={true}
                showQuantity={true}
              />
            </HeaderContent>
          </HeaderContentWrapper>
          <MainImage>
            {mainImage && <Figure width={800} height={800} image={mainImage} />}
          </MainImage>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </HeaderInner>
      </Header>
    </SectionObserver>
  );
};

export default ProductHero;
