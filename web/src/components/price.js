import styled from '@emotion/styled';
import React from 'react';
import {useLocale} from '../context/localeProvider';
import {usePageContext} from '../context/pageContext';
import {useStore} from '../context/storeContext';
import {formatPrice} from '../lib/helpers';
import {fonts} from '../styles/vars';

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  .currency {
    margin: 0 0.5ch 0 0;
  }
  .amount {
    font-family: ${fonts.en};
  }
  [lang='ar'] & {
    flex-direction: row-reverse;
    justify-content: flex-end;
    .currency {
      margin: 0 1ch 0 0;
    }
  }
`;

const Price = ({price}) => {
  const {currency} = useStore();
  const [locale] = useLocale();
  const {lang} = usePageContext();
  const formattedPrice = formatPrice(price, currency);

  return (
    <PriceWrapper>
      <span className='currency'>{locale?.[currency]?.[lang]} </span>
      <span className='amount'>{formattedPrice.toFixed(2)}</span>
    </PriceWrapper>
  );
};

export default Price;
