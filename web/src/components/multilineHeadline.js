import styled from '@emotion/styled';
import React from 'react';
import {breakTitle} from '../lib/helpers';

const Headline = styled.div`
  span {
    display: ${(props) => (props.dontBreak ? 'inline' : 'block')};
  }
`;

const MultilineHeadline = ({title = '', as = 'div', dontBreak = false}) => {
  return (
    title && (
      <Headline dontBreak={dontBreak} as={as}>
        {breakTitle(title).map((title) => (
          <span key={title.key}>{title.text}</span>
        ))}
      </Headline>
    )
  );
};

export default MultilineHeadline;
