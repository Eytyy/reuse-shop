import React, {useRef} from 'react';
import {RadioboxWrapper} from './styles';

const RadioBox = ({onChange, name, id, value, label, selectedOption}) => {
  const input = useRef();
  const checked = selectedOption === id;
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <RadioboxWrapper checked={checked}>
      <div className='box'>
        <span className='circle' />
      </div>
      <input
        ref={input}
        onChange={handleChange}
        type='radio'
        name={name}
        id={id}
        value={value}
        aria-hidden={true}
        checked={checked}
      />
      <label htmlFor={id}>{label}</label>
    </RadioboxWrapper>
  );
};

export default RadioBox;
