import React from 'react';
import {graphql} from 'gatsby';
import Product from '../components/product';

const ProductTemplate = ({data}) => {
  const product = data?.product || {};
  return <Product product={product} />;
};

export const query = graphql`
  query GetProduct($id: String!) {
    product: sanityProduct(id: {eq: $id}) {
      id
      _id
      defaultPrice
      relatedBody: _rawRelatedProductsBody(resolveReferences: {maxDepth: 10})
      relatedTitle: _rawRelatedProductsTitle(resolveReferences: {maxDepth: 10})
      relatedContent: _rawRelatedProductsContent(
        resolveReferences: {maxDepth: 10}
      )
      main: _rawMain(resolveReferences: {maxDepth: 10})
    }
  }
`;

export default ProductTemplate;
