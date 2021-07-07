import React, {useEffect} from 'react';
import {graphql} from 'gatsby';

import SEO from '../components/seo';
import Home from '../components/home';
import {useToggleCart} from '../context/siteContext';

const HomeTemplate = (props) => {
  const {data, pageContext} = props;
  const homeData = data?.home?.nodes[0] || [];

  const togglecart = useToggleCart();
  useEffect(() => {
    if (pageContext.cart) togglecart();
  }, [pageContext.cart, togglecart]);

  return (
    <>
      <SEO title='reuse' lang={pageContext.language} />
      <Home data={homeData} />
    </>
  );
};

export default HomeTemplate;

export const query = graphql`
  query homeQuery {
    home: allSanityFront(filter: {title: {eq: "Home"}}) {
      nodes {
        _id
        content: _rawContent(resolveReferences: {maxDepth: 10})
        header: _rawHeader
        title
      }
    }
  }
`;
