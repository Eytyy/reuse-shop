import React from 'react';
import {useSectionsContext} from '../../../context/sectionsContext';
import Figure from '../../media/figure';
import MultilineHeadline from '../../multilineHeadline';
import PortableText from '../../portableText';
import {
  Body,
  FixedWrapper,
  FixedWrapperInner,
  FixedWrapperContent,
  Headline,
  HeadlineColumn,
  HeadlineWrapper,
  ImageWrapper,
} from './styles';

const Fixed = ({headline, body, lang, image, id}) => {
  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();
  const visible = activeSectionId && id === activeSectionId;

  return (
    <FixedWrapper>
      <FixedWrapperInner>
        <HeadlineColumn visible={visible}>
          <HeadlineWrapper as='h2' visible={visible}>
            <Headline>
              <MultilineHeadline title={headline[lang]} />
            </Headline>
          </HeadlineWrapper>
        </HeadlineColumn>
        <FixedWrapperContent>
          {body[lang] && (
            <Body>
              <PortableText blocks={body[lang]} />
            </Body>
          )}
          <ImageWrapper>
            <Figure image={image} />
          </ImageWrapper>
        </FixedWrapperContent>
      </FixedWrapperInner>
    </FixedWrapper>
  );
};

export default Fixed;
