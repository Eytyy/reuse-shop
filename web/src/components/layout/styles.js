import React from 'react';
import {Global, css} from '@emotion/react';

import {fonts, colors, breakpoints} from '../../styles/vars';
import reset from '../../styles/reset';

import English from '../../fonts/PortraitText-Medium-Web.woff2';
import Arabic from '../../fonts/mitra05.woff2';

import styled from '@emotion/styled';
import {Link} from '../link';
import {font_styles} from '../../styles/typography';
import {at} from '../../styles/helpers';

export const button_styles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid;
  background: none;
  ${font_styles.action}
  cursor: pointer;
`;

export const form_element_style = css`
  appearance: none;
  border: none;
  border-radius: 0;
  background: none;
  outline: none;
  margin: 0;
  padding: 0;
  text-align: left;
  font-family: ${fonts.en};
  ${font_styles.action}
  color: ${colors.links};
`;

const styles = css`
  ${reset}

  @font-face {
    font-family: ${fonts.en};
    src: url(${English}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: ${fonts.ar};
    src: url(${Arabic}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --app-height: 100%;
  }

  html {
    color: ${colors.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${fonts.en};
    ${font_styles.base};
  }

  body {
    margin: 0;
    &.lockViewport {
      overflow: hidden;
    }
  }

  select,
  button,
  input {
    ${form_element_style}
    .product-form--hero & {
      color: ${colors.base};
    }

    [lang='ar'] & {
      font-family: ${fonts.ar};
    }

    :disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  input {
    width: 100%;
    border-bottom: 1px solid;

    ::placeholder {
      color: inherit;
    }
  }

  select {
    color: ${colors.links};
    border-bottom: 1px solid;
    background: url('data:image/svg+xml;utf8,<svg stroke="hsl(10, 75%, 70%)" fill="hsl(10, 75%, 70%)" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>');
    background-size: 16px;
    background-position: 100% center;
    background-repeat: no-repeat;

    .product-form--hero & {
      background: url('data:image/svg+xml;utf8,<svg stroke="hsl(200, 21%, 34%)" fill="hsl(200, 21%, 34%))" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>');
      background-repeat: no-repeat;
      background-position: 100% center;
    }

    [lang='ar'] & {
      background-position: 0 center;
    }
    ${at(breakpoints.laptop_13)} {
      background-size: 20px;
    }
  }

  .btn-icon,
  .filter-icon {
    font-size: 16px;

    ${at(breakpoints.laptop_13)} {
      font-size: 20px;
    }
  }

  a {
    color: ${colors.links};
    text-decoration: none;
    &.active {
      text-decoration: underline;
    }
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  [lang='ar'] {
    h1,
    h2,
    h3 {
      line-height: 1.2em;
    }
  }
`;

export const LinkButton = styled(Link)`
  ${button_styles}
`;

export const Button = styled.button`
  ${button_styles}
`;

export const Container = styled.div`
  height: var(--app-height);
  overflow-y: scroll;

  transition: ${(props) =>
    props.visible ? 'opacity 0ms linear' : 'opacity 300ms linear'};
  transition: opacity 300ms 300ms linear;
`;

export const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => (props.visible ? '100' : '-1')};
  background: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 200px;
    height: auto;
  }
`;

export const Copy = styled.div`
  h2 {
    ${font_styles.action};
    margin: 2em 0 1em;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
