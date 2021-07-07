import styled from '@emotion/styled';
import {colors} from '../../styles/vars';

export const FooterMenu = styled.nav`
  a {
    color: ${colors.links};
    margin: 0px 15px 0px 0px;
  }
  [lang='ar'] & {
    a {
      margin: 0px 0px 0px 15px;
    }
  }
`;
