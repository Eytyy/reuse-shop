import {css} from '@emotion/react';
import {at} from './helpers';
import {breakpoints, colors, fonts} from './vars';

export const base_font_size = '1em';

const display_1 = css`
  font-size: 32px;
  line-height: 1.2em;
  ${at(breakpoints.tablet)} {
    font-size: 42px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 100px;
  }
`;

const display_2 = css`
  font-size: 20px;
  line-height: 1.1;
  ${at(breakpoints.tablet)} {
    line-height: 1.1;
    font-size: 35px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 50px;
  }
`;

const display_3 = css`
  font-size: 28px;
  line-height: 1.2;
  ${at(breakpoints.tablet)} {
    font-size: 42px;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 50px;
  }
`;

const base = css`
  font-size: 14px;
  line-height: 1.3em;
  font-family: ${fonts.en};
  &[lang='ar'] {
    font-family: ${fonts.ar};
  }

  ${at(breakpoints.laptop_13)} {
    font-size: 16px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 20px;
  }
`;

const body = css`
  font-size: 14px;
  line-height: 1.3em;
  color: ${colors.secondary};
  ${at(breakpoints.tablet)} {
    font-size: 20px;
    line-height: 1.2;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 16px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 20px;
  }
`;

const category_desc = css`
  font-size: 20px;
  line-height: 1.3em;
  color: ${colors.secondary};
  ${at(breakpoints.laptop_13)} {
    font-size: 16px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 20px;
  }
`;

const action = css`
  font-size: 16px;
  line-height: 1.2em;
  ${at(breakpoints.laptop_13)} {
    font-size: 20px;
    [lang='ar'] & {
      font-size: 18px;
    }
  }
`;

const block_title = css`
  font-size: 18px;
  line-height: 1.15em;
  ${at(breakpoints.laptop_13)} {
    font-size: 24px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 30px;
  }
`;

export const font_styles = {
  display_1,
  display_2,
  display_3,
  action,
  block_title,
  body,
  category_desc,
  base,
};
