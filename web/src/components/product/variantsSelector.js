import React from 'react';
import {useProducts} from '../../context/siteContext';
import {FormSelect} from '../productForm/styles';

const VariantsSelector = ({
  defaultValue,
  variants,
  handleVariantChange,
  lang,
}) => {
  const {getVariantTitle} = useProducts();

  function getTitle(id) {
    const title = getVariantTitle(id);
    return title[lang] || title;
  }

  return (
    <FormSelect onChange={handleVariantChange}>
      <option value=''>{defaultValue?.[lang] || `Select`}</option>
      {variants.map(({id, title}) => (
        <option key={id} value={id}>
          {getTitle(id, title)}
        </option>
      ))}
    </FormSelect>
  );
};

export default VariantsSelector;
