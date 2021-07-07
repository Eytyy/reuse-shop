import styled from '@emotion/styled';
import {at, pad_content_from_top} from '../../styles/helpers';
import {mobile_grid} from '../../styles/layout';
import {breakpoints, gridGap, wrapper_padding} from '../../styles/vars';
import {SideHeaderColumn} from '../modules/styles';

import {Copy} from '../layout/styles';

export const Wrapper = styled.div`
  ${mobile_grid}
  padding: ${wrapper_padding.mobile};

  ${at(breakpoints.tablet)} {
    padding: ${wrapper_padding.tablet};
  }
  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
    grid-template-columns: repeat(6, 1fr);
    gap: ${gridGap.laptop};
  }
`;

export const HeadlineColumn = styled(SideHeaderColumn)``;

export const ContentWrapper = styled(Copy)`
  ${pad_content_from_top}
  position: relative;
  min-height: var(--app-height);
  grid-column: 2 / 5;
  ${at(breakpoints.tablet)} {
    padding-top: 0;
  }
`;
