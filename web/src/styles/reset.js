import {css} from '@emotion/react';

export default css`
  html {
    box-sizing: border-box;
  }

  * {
    font-weight: normal;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  header,
  video,
  article,
  section,
  main,
  nav,
  footer,
  svg {
    display: block;
  }

  img {
    width: 100%;
    height: auto;
  }
`;
