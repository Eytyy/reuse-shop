import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {font_styles} from '../../styles/typography';
import {breakpoints} from '../../styles/vars';

export const HeadlineWrapper = styled.div`
  ${font_styles.display_1}
`;

export const Title = styled.h1`
  font-size: 1em;
  margin: 0;
`;

export const MainImage = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  opacity: ${(props) => props.transparency};
  transition: opacity 300ms ease-in-out;
  grid-column: 2 / 5;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 2 / 4;
  }
  [lang='ar'] & {
    img {
      right: 0;
      left: auto;
    }
  }
`;
