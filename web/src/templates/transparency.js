import React from 'react';
import {graphql} from 'gatsby';
import BasicPage from '../components/page/basic';
import SEO from '../components/seo';

export const query = graphql`
  query TransparencyTemplateQuery {
    page: sanityTransparency(_id: {eq: "transparency"}) {
      _id
      title {
        en
        ar
      }
      body: _rawBody
    }
  }
`;

const TransparencyTemplate = (props) => {
  const {
    data,
    pageContext: {lang},
  } = props;
  return (
    <>
      <SEO title={data?.page?.title[lang]} lang={lang} />
      <BasicPage content={data?.page} />
    </>
  );
};

export default TransparencyTemplate;
