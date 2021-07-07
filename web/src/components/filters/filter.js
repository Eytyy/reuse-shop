import React from 'react';

import {FilterContent, FilterGroup, FilterGroupToggle} from './styles';
import Checkbox from '../common/checkbox';
import {MdCheck} from 'react-icons/md';
import {useLocale} from '../../context/localeProvider';
import {usePageContext} from '../../context/pageContext';
import {BsArrowDown, BsArrowUp} from 'react-icons/bs';

const Filter = ({
  label,
  name: filterName,
  content,
  updateFilters,
  origin,
  openFilterId,
  setOpenFilterId,
  id,
  hasActiveFilters,
  activeFilters,
}) => {
  const visible = openFilterId === id;
  const [locale] = useLocale();
  const {lang} = usePageContext();

  return (
    <FilterGroup>
      <FilterGroupToggle onClick={() => setOpenFilterId(visible ? null : id)}>
        <span className='filter-name'>
          {locale?.[label.toLowerCase()]?.[lang] || label || 'filter'}
        </span>
        {visible && (
          <span className='filter-icon'>
            <BsArrowUp />
          </span>
        )}
        {!visible && hasActiveFilters && (
          <span className='filter-icon'>
            <MdCheck />
          </span>
        )}
        {!visible && !hasActiveFilters && (
          <span className='filter-icon'>
            <BsArrowDown />
          </span>
        )}
      </FilterGroupToggle>
      <FilterContent visible={visible}>
        {content &&
          content.map(({name, _id}) => {
            return (
              <Checkbox
                activeFilters={activeFilters}
                updateFilters={updateFilters}
                name={filterName}
                id={`${origin}-${_id}`}
                value={_id}
                key={_id}
                label={name?.[lang] || 'untitled'}
              />
            );
          })}
      </FilterContent>
    </FilterGroup>
  );
};

export default Filter;
