import styled from '@emotion/styled';
import {at, pad_content_from_top} from '../../../styles/helpers';
import {mobile_grid} from '../../../styles/layout';
import {font_styles} from '../../../styles/typography';
import {
  breakpoints,
  wrapper_padding,
  gridGap,
  spacing,
  headerHeight,
} from '../../../styles/vars';
import {SideHeaderColumn} from '../styles';

export const ImageWrapper = styled.div`
  height: 100%;

  opacity: ${(props) => props.transparency};
  transition: opacity 200ms ease-in-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Headline = styled.div`
  height: 0;
  margin: 0;
  visibility: hidden;
  ${at(breakpoints.tablet)} {
    visibility: visible;
    height: auto;
    span {
      display: inline-block;
      margin-right: 1ch;
    }
  }
  ${at(breakpoints.laptop_13)} {
    font-size: 30px;
  }
  ${at(breakpoints.desktop)} {
    font-size: 42px;
  }
`;

export const Body = styled.div``;

export const Wrapper = styled.div`
  padding: 100px 0 0;
  ${at(breakpoints.laptop_13)} {
    padding: 0;
  }
`;

export const FullWrapper = styled.div`
  position: relative;
  height: var(--app-height);
  padding: ${wrapper_padding.mobile};
  transform: translateY(-70px);
  transition: transform 200ms linear;

  &:before {
    opacity: ${(props) => props.transparency};
    transition: opacity 200ms ease-in-out;
    content: '';
    position: absolute;
    z-index: 1;
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    background-blend-mode: multiply;
  }

  ${ImageWrapper} {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  ${at(breakpoints.tablet)} {
    padding: ${wrapper_padding.tablet};
  }
  ${at(breakpoints.laptop_13)} {
    padding: ${wrapper_padding.laptop};
    transform: translateY(0);
  }
`;

export const FullWrapperContent = styled.div`
  ${pad_content_from_top};
  position: relative;
  z-index: 2;
  color: #fff;
  opacity: ${(props) => props.transparency};
  transition: opacity 200ms ease-in-out;

  ${Headline},
  a {
    color: #fff;
  }

  a ${Body} {
    p:after {
      content: '→';
      display: inline-block;
      transform: translate(0.15em, 0.15em);
    }
  }

  ${Body} {
    ${font_styles.display_1}
  }

  ${at(breakpoints.tablet)} {
    width: 66.666%;
  }

  [lang='ar'] & {
    a ${Body} {
      p:after {
        transform: translate(-0.15em, 0.15em);
        content: '⟵';
      }
    }
  }
`;

export const HeadlineColumn = styled(SideHeaderColumn)``;

export const FixedWrapper = styled.div`
  ${mobile_grid}
  position: relative;
  height: ${`calc(var(--app-height) - ${headerHeight.mobile} - ${spacing.mobile})`};
  margin: 0 auto;
  padding: ${wrapper_padding.mobile};

  ${ImageWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    &:after {
      content: '';
      position: absolute;
      z-index: 1;
      display: block;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      background-blend-mode: multiply;
    }
  }

  ${at(breakpoints.tablet)} {
    height: var(--app-height);
    padding: ${wrapper_padding.tablet};
    gap: ${gridGap.tablet};
  }

  ${at(breakpoints.laptop_13)} {
    grid-template-columns: repeat(6, 1fr);
    gap: ${gridGap.laptop};
    padding: ${wrapper_padding.laptop};
    &:before {
      display: none;
    }
    ${HeadlineColumn} {
      grid-column: 1 / 2;
    }
  }
  ${at(breakpoints.desktop)} {
    ${ImageWrapper} {
      width: 100%;
    }
  }
`;

export const FixedWrapperInner = styled.div`
  position: relative;
  height: 100%;
  grid-column: 2 / 5;
  ${at(breakpoints.laptop_13)} {
    padding: 0;
    grid-column: 2 / 7;
  }
`;

export const FixedWrapperContent = styled.div`
  position: relative;
  height: 100%;
  ${Body} {
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    padding: 15px;
    font-size: 28px;
    line-height: 1.2em;
    color: #fff;
  }
  ${at(breakpoints.tablet)} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${gridGap.tablet};

    padding: ${`calc(${headerHeight.tablet} + ${spacing.tablet})`}
      ${wrapper_padding.tablet} ${wrapper_padding.tablet};
    ${Body} {
      position: relative;
      grid-column: 2/4;
      padding: 0;
    }
  }
  ${at(breakpoints.laptop_13)} {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: ${gridGap.laptop};

    padding: ${`calc(${headerHeight.laptop} + ${spacing.laptop})`}
      ${wrapper_padding.laptop} ${wrapper_padding.laptop};
    ${Body} {
      position: relative;
      font-size: 50px;
      grid-column: 3/6;
      padding: 0;
    }
  }
`;

export const HeadlineWrapper = styled.div`
  position: relative;
  ${pad_content_from_top.all}
`;
