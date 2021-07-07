import React from 'react';
import {usePageContext} from '../../context/pageContext';
import {useSectionsContext} from '../../context/sectionsContext';
import MultilineHeadline from '../multilineHeadline';

import PortableText from '../portableText';
import SectionObserver from '../sectionObserver';
import {Wrapper, ContentWrapper, HeadlineColumn} from './styles';

const BasicPage = ({content}) => {
  const {lang} = usePageContext();
  const {body, _id, title} = content;

  const {getActiveSectionInfo} = useSectionsContext();
  const {id: activeSectionId} = getActiveSectionInfo();
  const visible = activeSectionId === _id;

  return (
    <SectionObserver id={_id} title={title}>
      <Wrapper>
        <HeadlineColumn visible={visible}>
          <h2>{title && <MultilineHeadline title={title[lang]} />}</h2>
        </HeadlineColumn>
        <ContentWrapper>
          {body?.[lang] && <PortableText blocks={body[lang]} />}
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default BasicPage;
