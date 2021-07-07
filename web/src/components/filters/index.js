import {graphql, useStaticQuery} from 'gatsby';
import React, {useState} from 'react';
import {
  DesktopFiltersWrapper,
  FiltersWrapper,
  MobileFiltersInnerWrapper,
  MobileFiltersWrapper,
  ClearFiltersButton,
} from './styles';

import Sort from './sort';
import PriceFilter from './priceFilter';
import Filter from './filter';
import {MdClose} from 'react-icons/md';

const Filters = ({
  clearLabel,
  updateFilters,
  updatePriceFilter,
  visible,
  sortProducts,
  isFiltersActive,
  clearFilters,
  filters,
}) => {
  const {makers, colors, materials, categories} = useStaticQuery(graphql`
    {
      makers: allSanityMaker {
        nodes {
          _id
          name {
            ...TitleFragment
          }
        }
      }
      colors: allSanityColor {
        nodes {
          _id
          name {
            ...TitleFragment
          }
        }
      }
      materials: allSanityMaterial {
        nodes {
          _id
          name {
            ...TitleFragment
          }
        }
      }
      categories: allSanityCategory {
        nodes {
          _id
          title {
            ...TitleFragment
          }
        }
      }
    }
    fragment TitleFragment on SanityLocaleString {
      en
      ar
    }
  `);

  const [openFilterId, setOpenFilterId] = useState(null);
  const getFilterGroupState = (name) => filters?.[name].length > 0;

  const renderContent = (props) => {
    return (
      <>
        <Sort id='sortFilter' sortProducts={sortProducts} {...props} />
        <PriceFilter
          label='Price Range'
          updatePriceFilter={updatePriceFilter}
          {...props}
          id='priceRangeFilter'
          hasActiveFilters={getFilterGroupState('priceRange')}
        />
        {materials && (
          <Filter
            id='materialsFilter'
            label='Material'
            name='material'
            updateFilters={updateFilters}
            content={materials.nodes}
            activeFilters={filters?.material}
            hasActiveFilters={getFilterGroupState('material')}
            {...props}
          />
        )}
        {makers && (
          <Filter
            id='makerFilter'
            label='Maker'
            name='maker'
            updateFilters={updateFilters}
            content={makers.nodes}
            activeFilters={filters?.maker}
            hasActiveFilters={getFilterGroupState('maker')}
            {...props}
          />
        )}
        {colors && (
          <Filter
            id='colorFilter'
            label='colour'
            name='color'
            updateFilters={updateFilters}
            activeFilters={filters?.color}
            hasActiveFilters={getFilterGroupState('color')}
            content={colors.nodes}
            {...props}
          />
        )}
        {categories && (
          <Filter
            id='categoriesFilter'
            label='Category'
            name='categories'
            activeFilters={filters?.categories}
            hasActiveFilters={getFilterGroupState('categories')}
            updateFilters={updateFilters}
            content={categories.nodes}
            {...props}
          />
        )}
        {isFiltersActive && (
          <ClearFiltersButton onClick={clearFilters}>
            <span>{clearLabel} </span>
            <MdClose />
          </ClearFiltersButton>
        )}
      </>
    );
  };

  return (
    <FiltersWrapper>
      <MobileFiltersWrapper visible={visible}>
        <MobileFiltersInnerWrapper>
          {renderContent({origin: 'mobile', openFilterId, setOpenFilterId})}
        </MobileFiltersInnerWrapper>
      </MobileFiltersWrapper>
      <DesktopFiltersWrapper>
        <div className='inner'>
          {renderContent({origin: 'desktop', openFilterId, setOpenFilterId})}
        </div>
      </DesktopFiltersWrapper>
    </FiltersWrapper>
  );
};

export default Filters;
