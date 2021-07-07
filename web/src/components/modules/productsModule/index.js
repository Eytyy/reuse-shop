import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import {useSectionsContext} from '../../../context/sectionsContext';
import MultilineHeadline from '../../multilineHeadline';
import PortableText from '../../portableText';
import ProductCard from '../../product/card';
import SectionObserver from '../../sectionObserver';

import {
  Wrapper,
  DescriptionWrapper,
  Products,
  ContentWrapper,
  Headline,
  HeadlineColumn,
} from './styles';

const ProductsModule = (props) => {
  const {lang} = usePageContext();
  const {body, title, content, id} = props;

  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();

  const visible = activeSectionId && id === activeSectionId;
  const showheader = visible;

  return (
    <SectionObserver id={id} title={title}>
      <Wrapper>
        <ContentWrapper>
          <HeadlineColumn visible={showheader}>
            {title && (
              <Headline as='h2' visible={visible}>
                <MultilineHeadline title={title[lang]} />
              </Headline>
            )}
          </HeadlineColumn>
          {body && (
            <DescriptionWrapper>
              <PortableText blocks={body[lang]} />
            </DescriptionWrapper>
          )}
          <Products>
            {content?.length > 0 &&
              content.map((product, index) => (
                <ProductCard
                  key={product.id}
                  last={index === content.length - 1}
                  {...product}
                />
              ))}
          </Products>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default ProductsModule;
