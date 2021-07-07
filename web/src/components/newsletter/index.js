import React, {useEffect, useRef, useState} from 'react';
import {subscribe} from 'klaviyo-subscribe';
import {
  FormInput,
  FormInputWithButton,
  IconButton,
  ErrorMsg,
  SuccessMessage,
} from '../productForm/styles';
import {Button} from '../layout/styles';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';
import Joi from 'joi';

const initialState = {error: false, success: false, value: ''};

export const Newsletter = ({
  listId = 'EMPTY',
  customFields = {},
  message = `We've recieved your information!`,
  btnText,
  lang,
}) => {
  const [visible, toggle] = useState(false);
  const [state, setState] = useState(initialState);
  const errorMsg =
    lang === 'en' ? 'Enter a valid email' : 'أدخل بريد إلكتروني صحيح';
  const updateState = (changes) => {
    setState((prevState) => ({
      ...prevState,
      ...changes,
    }));
  };

  const form = useRef();

  const validationSchema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: {allow: ['com', 'net']},
    }),
  });

  const validate = (email) => {
    const {error} = validationSchema.validate({email});
    return typeof error !== 'undefined';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email} = form.current.elements;
    const isValid = validate(email);

    if (!isValid) {
      updateState({
        value: '',
        error: 'true',
      });
      return false;
    }

    subscribe(listId, email.value, customFields).then(() => {
      updateState({
        value: '',
        success: 'true',
      });
    });
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const isValid = validate(input);

    updateState({
      value: input,
      error: isValid,
    });
  };

  useEffect(() => {
    function resetForm() {
      console.log('hid');
      updateState(initialState);
    }
    if (state.success) {
      setTimeout(resetForm, 5000);
    }
    return function cleanup() {
      clearTimeout(resetForm);
    };
  }, [state.success]);

  if (visible) {
    return (
      <>
        {state.success ? (
          <SuccessMessage>{message}</SuccessMessage>
        ) : (
          <form ref={form} onSubmit={handleSubmit}>
            <FormInputWithButton>
              <FormInput
                onChange={handleChange}
                name='email'
                placeholder='Email'
                type='email'
                required={true}
                value={state.value}
              />
              <IconButton onClick={handleSubmit}>
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
            {state.error && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </form>
        )}
      </>
    );
  }

  return (
    <Button
      type='button'
      onClick={() => {
        if (listId !== 'EMPTY') toggle(!visible);
      }}
    >
      <span className='text'>{btnText}</span>
      {lang === 'ar' ? (
        <span className='icon'>
          <BsArrowLeft />
        </span>
      ) : (
        <span className='icon'>
          <BsArrowRight />
        </span>
      )}
    </Button>
  );
};
export default Newsletter;
