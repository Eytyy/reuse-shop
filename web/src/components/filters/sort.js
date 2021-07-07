import React, {useState} from 'react';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';
import {usePageContext} from '../../context/pageContext';
import RadioBox from '../common/radiobox';
import {FilterContent, FilterGroup, FilterGroupToggle} from './styles';

const Sort = ({sortProducts, id, openFilterId, setOpenFilterId, origin}) => {
  const [selectedOption, updateSelectedOption] = useState(null);
  const visible = openFilterId === id;
  const {lang} = usePageContext();
  const htlLabel =
    lang === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى إلى الأقل';
  const lthLabel =
    lang === 'en' ? 'Price: Low to High' : 'السعر: من الأقل إلى الأعلى';

  const onChange = ({target: {id, value}}) => {
    updateSelectedOption(id);
    sortProducts(value);
  };

  return (
    <FilterGroup>
      <FilterGroupToggle onClick={() => setOpenFilterId(visible ? null : id)}>
        <span>{lang === 'en' ? 'Sort By' : 'ترتيب حسب'}</span>
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
          id={`${origin}-phtl`}
          type='radio'
          name='sortOption'
          value='priceHighToLow'
          label={htlLabel}
          selectedOption={selectedOption}
        />
        <RadioBox
          onChange={onChange}
          id={`${origin}-plth`}
          type='radio'
          name='sortOption'
          value='priceLowToHigh'
          label={lthLabel}
          selectedOption={selectedOption}
        />
      </FilterContent>
    </FilterGroup>
  );
};

export default Sort;
