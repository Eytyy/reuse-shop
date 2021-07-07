import {css} from '@emotion/react';
import {gridGap} from './vars';

export const mobile_grid = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${`calc(${gridGap.mobile} * 2)`} ${gridGap.mobile};
`;
