import React from 'react';

import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';

import VariantsSelector from '../product/variantsSelector';
import OutOfStock from '../product/outOfStock';

import {FormWrapper, FormButtonGroup, IdleFormStatus} from './styles';
import QuantitySelector from '../quantitySelector';
import FormSubmitButton from './formSubmitButton';

const ProductFormDisplay = ({
  check,
  variants,
  quantity,

  handleVariantChange,
  handleSubmit,
  showQuantity,
  setQuantity,

  activeVariantId,
  available,
  adding,
  canPreorder,

  toggleWaitlist,
  waitlist,
  product,
  location,
}) => {
  const {lang} = usePageContext();
  const [locale] = useLocale();

  if (check) {
    return <IdleFormStatus>Checking Stock!</IdleFormStatus>;
  }

  const addingText = `${locale?.adding?.[lang]}`;
  const preorderText =
    (product?.availability && product.availability?.[lang]) ||
    `${locale?.preorder?.[lang]}`;
  const addToCartText = `${locale?.addToCart?.[lang]}`;
  const formCN = `product-form ${
    location === 'hero' ? 'product-form--hero' : 'product-form--card'
  }`;
  if (variants.length > 1) {
    return (
      <FormWrapper className={formCN} onSubmit={handleSubmit}>
        <FormButtonGroup showQuantity={showQuantity}>
          <VariantsSelector
            defaultValue={locale?.size}
            lang={lang}
            variants={variants}
            handleVariantChange={handleVariantChange}
          />
          {activeVariantId ? (
            available ? (
              <>
                {showQuantity && (
                  <QuantitySelector
                    updateQuantity={setQuantity}
                    quantity={quantity}
                  />
                )}
                <FormSubmitButton
                  addingText={addingText}
                  preorderText={preorderText}
                  addToCartText={addToCartText}
                  canPreorder={canPreorder}
                  adding={adding}
                />
              </>
            ) : (
              <OutOfStock
                toggleWaitlist={toggleWaitlist}
                activeVariantId={activeVariantId}
                waitlist={waitlist}
              />
            )
          ) : (
            <>
              {showQuantity && (
                <QuantitySelector
                  disabled
                  updateQuantity={setQuantity}
                  quantity={quantity}
                />
              )}
              <FormSubmitButton
                disabled
                addingText={addingText}
                preorderText={preorderText}
                addToCartText={addToCartText}
                canPreorder={canPreorder}
                adding={adding}
              />
            </>
          )}
        </FormButtonGroup>
      </FormWrapper>
    );
  }

  return available ? (
    <FormWrapper className={formCN} onSubmit={handleSubmit}>
      {showQuantity && (
        <QuantitySelector quantity={quantity} updateQuantity={setQuantity} />
      )}
      <FormSubmitButton
        addingText={addingText}
        preorderText={preorderText}
        addToCartText={addToCartText}
        canPreorder={canPreorder}
        adding={adding}
      />
    </FormWrapper>
  ) : (
    <OutOfStock
      location={location}
      toggleWaitlist={toggleWaitlist}
      activeVariantId={activeVariantId}
      waitlist={waitlist}
    />
  );
};

export default ProductFormDisplay;
