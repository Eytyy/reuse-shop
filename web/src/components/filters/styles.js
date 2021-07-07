import styled from '@emotion/styled';
import {at} from '../../styles/helpers';
import {mobile_grid} from '../../styles/layout';
import {
  breakpoints,
  colors,
  headerHeight,
  spacing,
  wrapper_padding,
} from '../../styles/vars';

export const FiltersWrapper = styled.div`
  margin-right: -40px;

  ${at(breakpoints.laptop_13)} {
    position: relative;
    overflow-y: scroll;
  }
`;

export const DesktopFiltersWrapper = styled.div`
  margin-top: 16px;
  display: none;

  ${at(breakpoints.laptop_13)} {
    display: block;
    position: relative;

    .inner {
      height: 100%;
    }
    ${at(breakpoints.laptop_13)} {
      padding-right: 40px;
    }
  }
`;

export const MobileFiltersWrapper = styled.div`
  ${mobile_grid}
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: ${`calc(${headerHeight.mobile} + ${wrapper_padding.mobile} + ${spacing.mobile}) ${wrapper_padding.mobile} ${wrapper_padding.mobile}`};
  transform: ${({visible}) =>
    visible ? 'translateX(0%)' : 'translateX(-100%)'};
  transition: opacity 300ms linear;
  opacity: ${({visible}) => (visible ? '1' : '0')};
  ${at(breakpoints.laptop_13)} {
    display: none;
  }
`;

export const MobileFiltersInnerWrapper = styled.div`
  grid-column: 3/5;
`;

export const FilterContent = styled.div`
  display: ${(props) => {
    return props.visible ? 'block' : 'none';
  }};
`;

export const FilterGroup = styled.div`
  display: block;
  margin-bottom: 16px;
`;

export const FilterGroupToggle = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  text-transform: capitalize;
`;

export const MobileFiltersToggle = styled.button`
  cursor: pointer;
  color: ${colors.links};
  transition: color 200ms linear;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 12;
  svg {
    margin-left: 6px;
  }
  ${at(breakpoints.laptop_13)} {
    display: none;
  }
`;

export const ClearFiltersButton = styled.button`
  cursor: pointer;
  color: ${colors.links};
  transition: color 200ms linear;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 12;
  width: 100%;
  svg {
    margin-left: 6px;
  }
`;
