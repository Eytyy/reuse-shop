import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {font_styles} from '../../styles/typography';
import {
  breakpoints,
  colors,
  fonts,
  gridGap,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

export const Wrapper = styled.div`
  height: ${`calc(var(--app-height) - ${headerHeight.mobile}  - ${wrapper_padding.mobile} - ${wrapper_padding.mobile} - ${wrapper_padding.mobile})`};
  padding: ${wrapper_padding.mobile} ${wrapper_padding.mobile} 0px;
  ${at(breakpoints.tablet)} {
    height: auto;
    padding: 0;
    margin: ${(props) => (props.last ? `0` : `0 0 ${gridGap.laptop}`)};
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto repeat(3, min-content);
  gap: 0px ${gridGap.mobile};
  height: 100%;
  ${at(breakpoints.tablet)} {
    grid-template-columns: auto;
    gap: 0;
  }
  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, max-content) min-content;
    gap: 0 ${gridGap.laptop};
  }
`;

export const EventImage = styled.div`
  position: relative;
  grid-column: 2 / 5;
  margin-bottom: 15px;
  z-index: 2;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  ${at(breakpoints.tablet)} {
    grid-column: 1 / 2;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 1 / 4;
    grid-row: 1 / 5;
    margin-bottom: 0px;
  }
`;

export const EventMeta = styled.div`
  ${font_styles.action}
  font-size: 14px;
  line-height: 1.35em;

  [lang='ar'] & {
    margin-bottom: 6px;
  }
`;

export const EventContent = styled.div`
  grid-column: 2 / 5;
  ${at(breakpoints.tablet)} {
    grid-column: 1 / 2;
  }
  ${at(breakpoints.laptop_13)} {
    grid-column: 4 / 6;
    grid-row: 1 / 2;
  }
`;

export const EventHeadline = styled.div`
  margin-bottom: 12px;

  [lang='ar'] & {
    margin-bottom: 15px;
  }
  h2 {
    ${font_styles.display_2}
    margin: 0;
  }
`;

export const EventDescription = styled.div`
  ${font_styles.body}
`;

export const EventDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${gridGap.mobile};
  position: fixed;
  z-index: 1;
  top: ${`calc(${wrapper_padding.mobile} + ${headerHeight.mobile})`};
  left: ${wrapper_padding.mobile};
  right: ${wrapper_padding.mobile};
  padding-top: ${spacing.mobile};

  opacity: ${({visible}) => (visible ? '1' : '0')};
  z-index: ${({visible}) => (visible ? '1' : '-1')};
  visibility: ${({visible}) => (visible ? 'visible' : 'hidden')};

  transition: opacity 200ms linear;

  .is-scrollDisabled & {
    pointer-events: all;
  }
  .is-scrollEnabled & {
    pointer-events: none;
  }

  ${at(breakpoints.tablet)} {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 1 / 2;
    padding: 0;
    align-items: flex-end;
    gap: ${gridGap.tablet};
  }
  ${at(breakpoints.laptop_13)} {
    gap: ${gridGap.laptop};
    grid-column: 4 / 6;
    grid-row: 4 / 5;
  }
`;

export const EventDate = styled.div`
  font-size: 20px;
  grid-row: 1;
  ${at(breakpoints.laptop_13)} {
    font-size: 24px;
  }
`;

export const EventFees = styled.div`
  ${font_styles.action}
  border-top: 2px solid ${colors.links};
  margin-top: 9px;
  padding-top: 9px;
`;

export const EventTime = styled.div`
  grid-row: 2;
  margin-top: 15px;
  transform: translateY(0.3em);
  font-size: 38px;
  line-height: 1.2em;

  .time-from,
  .time-to {
    font-family: ${fonts.en};
  }
  ${at(breakpoints.tablet)} {
    grid-row: 1;
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 42px;
    margin-top: 30px;
  }
`;

export const EventDateRow = styled.div``;
