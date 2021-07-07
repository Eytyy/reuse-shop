import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import SectionObserver from '../../sectionObserver';
import Fixed from './fixed';
import Full from './full';
import {Wrapper} from './styles';

const ImageTextModule = (props) => {
  const {
    body,
    headline,
    image,
    layout: isFullImage = false,
    id,
    linkTo,
  } = props;

  const {lang} = usePageContext();

  return (
    <SectionObserver
      id={id}
      type={isFullImage ? 'fullImageTextModule' : 'fixedImageTextModule'}
      title={headline}
    >
      {isFullImage ? (
        <Wrapper>
          <Full
            linkTo={linkTo}
            id={id}
            headline={headline}
            body={body}
            lang={lang}
            image={image}
          />
        </Wrapper>
      ) : (
        <Fixed
          linkTo={linkTo}
          id={id}
          headline={headline}
          body={body}
          lang={lang}
          image={image}
        />
      )}
    </SectionObserver>
  );
};

export default ImageTextModule;
