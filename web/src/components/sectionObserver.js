import styled from '@emotion/styled';
import React, {useEffect, useRef, useState} from 'react';
import {useSectionsContext} from '../context/sectionsContext';

const Wrapper = styled.div`
  position: relative;
  background: #fff;
  z-index: ${(props) => (props.visible ? (props.isHeader ? '1' : '3') : '2')};
`;

const SectionObserver = ({children, id, title = '', type = 'default'}) => {
  const {addSection, updateSection, location} = useSectionsContext();
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const current = ref.current;
    const options = {
      rootMargin: window && window.innerWidth > 1240 ? '-72px' : '-100px',
      threshold: 0,
    };

    const cb = (entries) => {
      entries.forEach((entry) => {
        const {target, isIntersecting} = entry;
        setVisible(isIntersecting);
        updateSection({
          id,
          visible: isIntersecting,
          bounds: {
            y: target.offsetTop,
            height: target.offsetHeight,
          },
        });
      });
    };

    const observer = new IntersectionObserver(cb, options);
    observer.observe(ref.current);

    addSection({id, node: current, title, type, location: location.pathname});

    return function cleanup() {
      observer.unobserve(current);
    };
  }, [addSection, updateSection, id, title, type]);

  return (
    <Wrapper
      visible={visible}
      isHeader={type === 'headerModule'}
      id={id}
      ref={ref}
    >
      {children}
    </Wrapper>
  );
};

export default SectionObserver;
