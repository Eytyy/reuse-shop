import React from 'react';
import {graphql} from 'gatsby';
import BasicPage from '../components/page/basic';
import SEO from '../components/seo';

export const query = graphql`
  query BasicPageTemplateQuery($slug: String!) {
    page: sanityBasicPage(slug: {current: {eq: $slug}}) {
      _id
      title {
        en
        ar
      }
      body: _rawBody
      slug {
        current
      }
    }
  }
`;

const BasicPageTemplate = (props) => {
  const {
    data,
    pageContext: {lang},
  } = props;
  return (
    <>
      <SEO title={data.page.title[lang]} lang={lang} />
      <BasicPage content={data?.page} />
    </>
  );
};

export default BasicPageTemplate;
