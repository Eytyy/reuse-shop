import {graphql} from 'gatsby';
import React from 'react';
import ShopContainer from '../components/shop/shopContainer';

const shop = ({data, location}) => {
  return <ShopContainer location={location} data={data} />;
};

export default shop;

export const query = graphql`
  query GetShopProducts {
    shop: sanityShopSettings(_id: {eq: "shop"}) {
      displayTitle: _rawDisplayTitle
      image {
        ...SanityImage
      }
      creations: _rawCreations
      curations: _rawCurations
      headline: _rawHeadline
    }
  }
`;
