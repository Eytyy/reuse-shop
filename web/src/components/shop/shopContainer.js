import React, {useCallback, useEffect, useState} from 'react';
import {useProducts} from '../../context/siteContext';
import ShopDisplay from './shopDisplay';

const ShopContainer = ({data}) => {
  const {shop} = data;
  const {products} = useProducts();

  const [type, setType] = useState('creations');

  const filterContentByType = useCallback(() => {
    return (
      products?.nodes?.filter(({main}) => {
        return main.type === type;
      }) || []
    );
  }, [products.nodes, type]);

  // const filterShape = {name: '', values: [{id: '', name: ''}]};
  // exmaple {name: 'maker', values: [{id: 1, name: 'tala'},{id: 2, name: 'maha'}]}
  const [visibleProducts, setVisibleProducts] = useState(filterContentByType);

  const [visibleContent, setVisibleContent] = useState([]);

  const [isFiltersActive, setIsFiltersActive] = useState(0);

  const initialFiltersState = {
    material: [],
    categories: [],
    color: [],
    maker: [],
    priceRange: '',
  };

  const [filters, setFilters] = useState(initialFiltersState);

  function clearFilters() {
    setFilters(initialFiltersState);
  }

  useEffect(() => {
    const visible = filterContentByType();
    setVisibleProducts(visible);
  }, [type, filterContentByType]);

  // Filter Content
  useEffect(() => {
    function filterContentByPrice(product) {
      if (!filters.priceRange) return true;

      const price = parseInt(product.defaultPrice, 10);
      switch (filters.priceRange) {
        case '50-':
          return price < 50;
        case '50-250':
          return price >= 50 && price <= 250;
        case '250-500':
          return price >= 250 && price <= 5500;
        case '500+':
          return price >= 500;
        default:
          return false;
      }
    }

    const filtersKeys = Object.keys(filters);

    const filtered = visibleProducts.filter((product) => {
      return filtersKeys.every((key) => {
        if (key === 'priceRange') {
          return filterContentByPrice(product);
        }
        if (!filters[key].length) return true;
        const productField = product.main[key];

        if (Array.isArray(productField)) {
          return productField.some(({_id}) => filters[key].includes(_id));
        }
        return filters[key].includes(productField._id);
      });
    });

    setVisibleContent(filtered);
  }, [filters, visibleProducts]);

  function updatePriceFilter(price) {
    setFilters((prevState) => ({
      ...prevState,
      priceRange: price,
    }));
  }

  useEffect(() => {
    const filtersActiveState = Object.keys(filters).some((key) => {
      const filter = filters[key];
      if (Array.isArray(filter)) {
        return filter.length > 0;
      } else if (filter !== '') {
        return true;
      }
      return false;
    });
    setIsFiltersActive(filtersActiveState);
  }, [filters, filterContentByType]);

  function updateFilters(e) {
    const {name, value} = e.target;
    if (!filters[name]) return false;

    const indexOfFilter = filters[name].indexOf(value);
    const filterExists = indexOfFilter !== -1;
    const updatedValues = filterExists
      ? [
          ...filters[name].slice(0, indexOfFilter),
          ...filters[name].slice(indexOfFilter + 1, filters[name].length),
        ]
      : [...filters[name], value];

    setFilters((filters) => ({
      ...filters,
      [name]: [...updatedValues],
    }));
  }

  function sortProducts(value) {
    switch (value) {
      case 'priceHighToLow':
        const htl = [...visibleContent].sort((a, b) => {
          const aPrice = a.defaultPrice;
          const bPrice = b.defaultPrice;
          const ab = parseInt(aPrice, 10) < parseInt(bPrice, 10);
          return ab ? 1 : -1;
        });
        setVisibleContent(htl);
        break;
      case 'priceLowToHigh':
        const lth = [...visibleContent].sort((a, b) => {
          const aPrice = a.defaultPrice;
          const bPrice = b.defaultPrice;
          const ab = parseInt(aPrice, 10) < parseInt(bPrice, 10);
          return ab ? -1 : 1;
        });
        setVisibleContent(lth);
        break;
      default:
        break;
    }
  }

  const {headline, image, displayTitle} = shop;
  const description = shop[type];

  return (
    <ShopDisplay
      title={displayTitle}
      filters={filters}
      isFiltersActive={isFiltersActive}
      sortProducts={sortProducts}
      updatePriceFilter={updatePriceFilter}
      updateFilters={updateFilters}
      visibleContent={visibleContent}
      setType={setType}
      type={type}
      image={image}
      description={description}
      headline={headline}
      clearFilters={clearFilters}
    />
  );
};

export default ShopContainer;
