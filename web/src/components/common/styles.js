import styled from '@emotion/styled';
import {colors} from '../../styles/vars';

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.base};
  margin: 6px 0px;
  font-size: 12px;
  .box {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border: 1px solid currentColor;
    border-radius: 2px;
    background-color: ${(props) =>
      props.checked ? colors.base : 'transparent'};
    margin: 0 6px 0 0;
    transition: background-color 100ms ease-in-out;
    svg {
      color: #fff;
    }
  }
  input {
    display: none;
  }
  label {
    cursor: pointer;
    display: block;
  }
  [lang='ar'] & {
    .box {
      margin: 0 0 0 6px;
    }
  }
`;

export const RadioboxWrapper = styled(CheckboxWrapper)`
  .box {
    border-radius: 100%;
    background: #fff;
    .circle {
      background-color: ${(props) => (props.checked ? colors.base : '#FFF')};
      width: 90%;
      height: 90%;
      display: block;
      border-radius: 100%;
      border: 1px solid #fff;
    }
  }
`;
