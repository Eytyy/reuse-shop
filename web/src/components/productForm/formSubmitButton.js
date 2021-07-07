import React from 'react';
import {FormButton} from './styles';
import {AiOutlineShopping} from 'react-icons/ai';

const FormSubmitButton = ({
  adding,
  canPreorder,
  addingText,
  preorderText,
  addToCartText,
  reset,
  ...props
}) => {
  return (
    <FormButton className='formSubmitButton' {...props}>
      <span className='bnt-text'>
        {adding
          ? `${addingText}`
          : canPreorder
          ? `${preorderText}`
          : `${addToCartText}`}
      </span>
      {!adding && (
        <span className='btn-icon'>
          <AiOutlineShopping />
        </span>
      )}
    </FormButton>
  );
};

export default FormSubmitButton;
