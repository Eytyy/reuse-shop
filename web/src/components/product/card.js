import React, {useState} from 'react';

import {usePageContext} from '../../context/pageContext';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';
import Figure from '../media/figure';
import {Link} from '../link';
import Price from '../price';

import {
  ProductCardWrapper,
  ProductCardTitle,
  ProductPrice,
  ProductActionsWrapper,
  ProductCardContent,
} from './card.styles';
import {LinkButton} from '../layout/styles';
import {useLocale} from '../../context/localeProvider';
import ProductForm from '../productForm';

const ProductCard = ({defaultPrice, main, last}) => {
  const [price, setPrice] = useState(defaultPrice);
  const {lang} = usePageContext();
  const [locale] = useLocale();

  if (!main) return null;

  const {title, mainImage, slug} = main;
  const url = `/products/${slug.current}`;
  return (
    <ProductCardWrapper last={last}>
      <Link className='link-wrapper' to={url}>
        {mainImage && <Figure image={mainImage} width={400} height={400} />}
        <ProductCardContent>
          {title && (
            <ProductCardTitle>
              {title[lang] || title?.en || 'untitled'}
            </ProductCardTitle>
          )}
          {price && (
            <ProductPrice>
              <Price price={price} />
            </ProductPrice>
          )}
        </ProductCardContent>
      </Link>

      <ProductActionsWrapper>
        {url && (
          <LinkButton to={url}>
            <span className='btn-text'>{locale?.more?.[lang]}</span>
            {lang === 'ar' ? (
              <span className='btn-icon'>
                <BsArrowLeft />
              </span>
            ) : (
              <span className='btn-icon'>
                <BsArrowRight />
              </span>
            )}{' '}
          </LinkButton>
        )}
        <ProductForm
          product={main}
          showQuantity={false}
          waitlist={false}
          handle={slug.current}
          setPrice={setPrice}
        />
      </ProductActionsWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
