import React, {useState} from 'react';
import {decode} from 'shopify-gid';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {usePageContext} from '../../context/pageContext';

import {
  FormInput,
  FormInputWithButton,
  IconButton,
  WaitlistConfirmationMessage,
} from '../productForm/styles';

const Waitlist = ({accountId, message, variantId}) => {
  const [success, setSuccess] = useState(false);
  const {lang} = usePageContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const {email} = form.elements;
    const productIdDecoded = decode(variantId).id;

    fetch('/.netlify/functions/back-in-stock', {
      method: 'POST',
      body: JSON.stringify({
        accountId,
        email: email.value,
        variant: productIdDecoded,
        platform: 'shopify',
      }),
    }).then(() => {
      setSuccess(true);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {!success ? (
        <FormInputWithButton>
          <FormInput
            name='email'
            placeholder='Email'
            type='email'
            required={true}
          />
          <IconButton>
            {lang === 'ar' ? (
              <span className='btn-icon'>
                <BsArrowLeft />
              </span>
            ) : (
              <span className='btn-icon'>
                <BsArrowRight />
              </span>
            )}
          </IconButton>
        </FormInputWithButton>
      ) : (
        <WaitlistConfirmationMessage>{message}</WaitlistConfirmationMessage>
      )}
    </form>
  );
};

export default Waitlist;
