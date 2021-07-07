import React, {useState} from 'react';

import {FilterContent, FilterGroup, FilterGroupToggle} from './styles';
import RadioBox from '../common/radiobox';
import {usePageContext} from '../../context/pageContext';
import {useStore} from '../../context/storeContext';
import {formatPrice} from '../../lib/helpers';
import {useLocale} from '../../context/localeProvider';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';

const PriceFilter = ({
  label,
  updatePriceFilter,
  origin,
  openFilterId,
  setOpenFilterId,
  id,
}) => {
  const [selectedOption, updateSelectedOption] = useState(null);
  const {lang} = usePageContext();
  const [locale] = useLocale();
  const {currency} = useStore();

  const onChange = ({target: {id, value}}) => {
    updateSelectedOption(id);
    updatePriceFilter(value);
  };

  const visible = openFilterId === id;
  const filterLabel = lang === 'en' ? 'Price Range' : 'السعر';

  const localizedCurrency = locale?.[currency]?.[lang];

  function getRangeLabel({low, high, sep = '–', prefix = '', suffix = ''}) {
    const prefixText = prefix && `${prefix} `;
    const part1 =
      (low && `${localizedCurrency} ${formatPrice(low, currency)}`) || '';
    const part2 =
      (high && ` ${sep} ${localizedCurrency} ${formatPrice(high, currency)}`) ||
      '';
    const suffixText = suffix && `${suffix}`;

    return `${prefixText}${part1}${part2}${suffixText}`;
  }

  const opt1 =
    lang === 'en'
      ? `Less than ${currency} ${formatPrice(50, currency)}`
      : `أقل من ${formatPrice(50, currency)} ${localizedCurrency}`;

  return (
    <FilterGroup>
      <FilterGroupToggle onClick={() => setOpenFilterId(visible ? null : id)}>
        <span className='filter-name'>{filterLabel}</span>
        {visible && (
          <span className='filter-icon'>
            <BsArrowUp />
          </span>
        )}
        {!visible && (
          <span className='filter-icon'>
            <BsArrowDown />
          </span>
        )}
      </FilterGroupToggle>
      <FilterContent visible={visible}>
        <RadioBox
          onChange={onChange}
          id={`${origin}-priceRange-1`}
          name='priceRange'
          value='50-'
          label={opt1}
          selectedOption={selectedOption}
        />
        <RadioBox
          onChange={onChange}
          id={`${origin}-priceRange-2`}
          name='priceRange'
          value='50-250'
          label={getRangeLabel({low: 50, high: 250})}
          selectedOption={selectedOption}
        />
        <RadioBox
          onChange={onChange}
          id={`${origin}-priceRange-3`}
          name='priceRange'
          value='250-500'
          label={getRangeLabel({low: 250, high: 500})}
          selectedOption={selectedOption}
        />
        <RadioBox
          onChange={onChange}
          id={`${origin}-priceRange-4`}
          name='priceRange'
          value='500+'
          label={getRangeLabel({low: 500, suffix: '+'})}
          selectedOption={selectedOption}
        />
      </FilterContent>
    </FilterGroup>
  );
};

export default PriceFilter;
