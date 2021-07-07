import React from 'react';
import {graphql} from 'gatsby';
import Page from '../components/page';
import SEO from '../components/seo';

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: sanityPage(slug: {current: {eq: $slug}}) {
      _id
      title {
        en
        ar
      }
      content: _rawContent(resolveReferences: {maxDepth: 10})
      header: _rawHeader
      slug {
        current
      }
    }
  }
`;

const PageTemplate = (props) => {
  const {
    data,
    pageContext: {lang},
  } = props;
  return (
    <>
      <SEO title={data.page.title[lang]} lang={lang} />
      <Page data={data?.page} />
    </>
  );
};

export default PageTemplate;
