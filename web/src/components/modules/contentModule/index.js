import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import {useSectionsContext} from '../../../context/sectionsContext';
import MediaBlock from '../../media/MediaBlock';
import MultilineHeadline from '../../multilineHeadline';
import PortableText from '../../portableText';
import SectionObserver from '../../sectionObserver';

import {
  ContentColumn,
  Headline,
  HeadlineColumn,
  Wrapper,
  DescriptionWrapper,
  ContentWrapper,
} from './styles';

const ContentModule = (props) => {
  const {title, body, media, id} = props;
  const {lang} = usePageContext();
  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();

  const visible = activeSectionId === id;
  return (
    <SectionObserver id={id} title={title}>
      <Wrapper>
        <ContentWrapper>
          <HeadlineColumn visible={visible}>
            {title && (
              <Headline as='h2' visible={visible}>
                <MultilineHeadline title={title[lang]} />
              </Headline>
            )}
          </HeadlineColumn>
          <DescriptionWrapper>
            <PortableText blocks={body[lang]} />
          </DescriptionWrapper>
          <ContentColumn>{media && <MediaBlock data={media} />}</ContentColumn>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default ContentModule;
