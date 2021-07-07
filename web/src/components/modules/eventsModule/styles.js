import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {at} from '../../../styles/helpers';
import {breakpoints, gridGap, wrapper_padding} from '../../../styles/vars';
import {SideHeaderColumn} from '../styles';

export const HeadlineColumn = styled(SideHeaderColumn)`
  opacity: 0;
  transition: opacity 200ms ease-in-out;

  ${({visible}) =>
    visible &&
    css`
      opacity: 1;
    `}
  ${at(breakpoints.tablet)} {
    opacity: 1;
  }
`;

export const Headline = styled.div`
  position: relative;
  opacity: 1;
`;

export const ContentColumn = styled.div`
  position: relative;
  z-index: 3;
  height: 100%;
`;

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  margin: 0 auto;

  ${at(breakpoints.tablet)} {
    display: grid;
    gap: ${gridGap.laptop};
    grid-template-columns: repeat(4, 1fr);
    padding: ${wrapper_padding.tablet} ${wrapper_padding.tablet} 5px;
    ${HeadlineColumn} {
      grid-column: 1 / 2;
    }
    ${ContentColumn} {
      grid-column: 2 / 5;
    }
  }

  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(6, 1fr);
    padding: ${wrapper_padding.laptop} ${wrapper_padding.laptop} 0;
    ${ContentColumn} {
      grid-column: 2 / 7;
    }
  }
  ${at(breakpoints.desktop)} {
    ${ContentColumn} {
      grid-column: 2 / 6;
    }
  }
`;
