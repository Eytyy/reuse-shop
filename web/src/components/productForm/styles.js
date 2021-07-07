import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {font_styles} from '../../styles/typography';
import {colors, fonts, gridGap} from '../../styles/vars';
import {button_styles} from '../layout/styles';

export const AddToCartButton = styled.button``;

export const FormWrapper = styled.form``;

export const FormButtonGroup = styled.div`
  display: grid;
  gap: ${gridGap.mobile};

  ${(props) =>
    props?.showQuantity
      ? css`
          grid-template-columns: auto auto;
          .formSubmitButton {
            grid-column: 1 / 3;
          }
        `
      : css`
          grid-template-rows: auto auto);
        `};
`;

export const IdleFormStatus = styled.div`
  width: 100%;
  font-size: 20px;
  border-bottom: 1px solid;
  color: ${colors.links};
  padding: 20px 0;
`;

export const FormButton = styled.button`
  ${button_styles}
  cursor: pointer;
  width: 100%;
`;

export const FormSelect = styled.select`
  padding: 15px 0;
`;

export const FormInputWithButton = styled.div`
  position: relative;
  ${font_styles.action}
  input {
    padding-right: 30px;
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    width: auto;
  }
`;

export const FormInput = styled.input`
  padding: 15px 0;
  border-bottom: 1px solid;
  &[lang='ar'] {
    font-family: ${fonts.ar};
  }
`;

export const IconButton = styled.button`
  cursor: pointer;
`;

export const OutofStockWrapper = styled.div`
  ${(props) =>
    props.location === 'hero' &&
    css`
      input {
        color: ${colors.base};
      }
    `}
`;

export const WaitlistConfirmationMessage = styled.div`
  padding: 15px 0;
  border-bottom: 1px solid;
`;

export const ErrorMsg = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

export const SuccessMessage = styled.div`
  padding: 15px 0px;
`;
