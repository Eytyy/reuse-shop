import React from 'react';

import {usePageContext} from '../../../context/pageContext';
import {useLocale} from '../../../context/localeProvider';

import SectionObserver from '../../sectionObserver';

import PortableText from '../../portableText';
import Figure from '../../media/figure';
import MultilineHeadline from '../../multilineHeadline';
import {LinkButton} from '../../layout/styles';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {
  Wrapper,
  ContentWrapper,
  NestedPages,
  NestedPage,
  NestedPageTitle,
  DescriptionWrapper,
  Headline,
  HeadlineColumn,
} from './styles';
import {useSectionsContext} from '../../../context/sectionsContext';

const NestedPagesModule = (props) => {
  const {title, content, body, id} = props;
  const {lang} = usePageContext();
  const [locale] = useLocale();
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
          {body && (
            <DescriptionWrapper>
              <PortableText blocks={body[lang]} />
            </DescriptionWrapper>
          )}
          <NestedPages>
            {content.map(({_id, title, header, slug}, index) => (
              <NestedPage key={_id} last={content.length === index - 1}>
                {header?.image && (
                  <Figure image={header.image} width={400} height={400} />
                )}
                <NestedPageTitle>{title[lang]}</NestedPageTitle>
                <LinkButton to={`/${slug.current}`}>
                  <span className='btn-text'>{locale?.['more']?.[lang]}</span>
                  {lang === 'ar' ? (
                    <span className='btn-icon'>
                      <BsArrowLeft />
                    </span>
                  ) : (
                    <span className='btn-icon'>
                      <BsArrowRight />
                    </span>
                  )}
                </LinkButton>
              </NestedPage>
            ))}
          </NestedPages>
        </ContentWrapper>
      </Wrapper>
    </SectionObserver>
  );
};

export default NestedPagesModule;
