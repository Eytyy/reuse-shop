import React, {useEffect, useRef, useState} from 'react';
import {IoMdCheckmark} from 'react-icons/io';
import {CheckboxWrapper} from './styles';

const Checkbox = ({activeFilters, updateFilters, name, id, value, label}) => {
  const [checked, updateChecked] = useState(false);
  const inputRef = useRef();

  const handleChange = (e) => {
    updateFilters(e);
    updateChecked(!checked);
  };

  useEffect(() => {
    if (activeFilters.length > 0) {
      updateChecked(activeFilters.includes(value));
    } else {
      updateChecked(false);
    }
  }, [activeFilters]);

  return (
    <CheckboxWrapper checked={checked}>
      <label htmlFor={id} className='box'>
        <IoMdCheckmark />
      </label>
      <input
        ref={inputRef}
        checked={checked}
        onChange={handleChange}
        type='checkbox'
        name={name}
        id={id}
        value={value}
        aria-hidden={true}
      />
      <label htmlFor={id}>{label}</label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
