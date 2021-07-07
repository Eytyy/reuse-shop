import React, {useState} from 'react';
import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import {useSectionsContext} from '../../context/sectionsContext';
import MediaBlock from '../media/MediaBlock';
import ProductsModule from '../modules/productsModule';

import SectionObserver from '../sectionObserver';
import PortableText from '../portableText';
import ProductHero from './hero';
import PriceBreakdown from './priceBreakdown';
import {
  ProductPage,
  DescriptionWrapper,
  ProductDetails,
  ProductContent,
  ProductDetailsItem,
  ProductGallery,
} from './styles';

const Product = ({product}) => {
  const {
    defaultPrice,
    main,
    _id,
    relatedBody,
    relatedTitle,
    relatedContent,
  } = product;

  const [price, setPrice] = useState(defaultPrice);
  const {lang} = usePageContext();
  const [locale] = useLocale();

  const {body, gallery, breakdown, color, maker, material, type} = main;

  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();

  const contentId = `${_id}-content`;
  const visible = activeSectionId && contentId === activeSectionId;
  const isVisible = visible;

  const pageTitle = locale?.[type]?.[lang];

  return (
    <ProductPage>
      <ProductHero
        id={_id}
        setPrice={setPrice}
        title={pageTitle}
        main={main}
        price={price}
      />
      <SectionObserver id={contentId} title={pageTitle}>
        <ProductContent>
          <ProductDetails visible={isVisible}>
            <div>
              {color && (
                <ProductDetailsItem>
                  <div className='label'>{locale?.colour?.[lang]}</div>
                  <div className='value'>{color?.name[lang]}</div>
                </ProductDetailsItem>
              )}
              {material && (
                <ProductDetailsItem>
                  <div className='label'>{locale?.material?.[lang]}</div>
                  <div className='value'>{material?.name[lang]}</div>
                </ProductDetailsItem>
              )}
              {maker && (
                <ProductDetailsItem>
                  <div className='label'>{locale?.maker?.[lang]}</div>
                  <div className='value'>{maker?.name[lang]}</div>
                </ProductDetailsItem>
              )}
            </div>
          </ProductDetails>

          {body && (
            <DescriptionWrapper>
              <PortableText blocks={body[lang]} />
            </DescriptionWrapper>
          )}

          {gallery && (
            <ProductGallery>
              <MediaBlock format='square' data={gallery} />
            </ProductGallery>
          )}

          {breakdown && <PriceBreakdown lang={lang} content={breakdown} />}
        </ProductContent>
      </SectionObserver>
      {relatedContent?.length > 0 && (
        <ProductsModule
          id={`${_id}-recommended`}
          body={relatedBody}
          title={relatedTitle}
          content={relatedContent}
        />
      )}
    </ProductPage>
  );
};

export default Product;
