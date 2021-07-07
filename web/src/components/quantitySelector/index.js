import React from 'react';
import {MdAdd, MdRemove} from 'react-icons/md';
import {Selector, QuantityButton, QuantityValue} from './styles';

const QuantitySelector = ({updateQuantity, quantity, disabled}) => {
  function decreaseQuantity() {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
  }
  function increaseQuantity() {
    updateQuantity(quantity + 1);
  }

  return (
    <Selector disabled={disabled} className='quantity_selector'>
      <QuantityButton
        disabled={disabled}
        type='button'
        aria-label='decrease quantity'
        onClick={decreaseQuantity}
      >
        <MdRemove />
      </QuantityButton>
      <QuantityValue>{quantity}</QuantityValue>
      <QuantityButton
        disabled={disabled}
        type='button'
        aria-label='increase quantity'
        onClick={increaseQuantity}
      >
        <MdAdd />
      </QuantityButton>
    </Selector>
  );
};

export default QuantitySelector;
