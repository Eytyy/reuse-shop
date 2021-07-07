import React from 'react';
import {usePageContext} from '../../../context/pageContext';
import {
  useSectionInfo,
  useSectionsContext,
} from '../../../context/sectionsContext';
import EventCard from '../../event/card';
import MultilineHeadline from '../../multilineHeadline';
import SectionObserver from '../../sectionObserver';

import {
  ContentColumn,
  Headline,
  HeadlineColumn,
  Wrapper,
  ContentWrapper,
} from './styles';

const EventsModule = (props) => {
  const {title, content, id} = props;
  const {lang} = usePageContext();
  const {scrollPosition, y, height, headerHeight} = useSectionInfo(id);

  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();
  const visible = activeSectionId && id === activeSectionId;

  const showHeader =
    visible &&
    scrollPosition >= y - headerHeight &&
    scrollPosition <= y + height * 0.6
      ? true
      : false;

  return (
    <SectionObserver id={id} title={title}>
      <Wrapper>
        <ContentWrapper>
          <HeadlineColumn visible={showHeader}>
            <Headline as='h2' visible={showHeader}>
              <MultilineHeadline title={title[lang]} />
            </Headline>
          </HeadlineColumn>
          <ContentColumn>
            {content.map(({_key, ...rest}, index) => (
              <EventCard
                sectionIsVisible={showHeader}
                wrapperTop={y}
                last={index === content.length - 1}
                key={_key}
                _key={_key}
                {...rest}
              />
            ))}
          </ContentColumn>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default EventsModule;
