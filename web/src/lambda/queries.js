exports.PRODUCT_QUERY = `query getProduct($id: ID!) {
  node(id: $id) {
    ... on Product {
      id
      handle
      title
      totalVariants
      images(first: 100) {
        edges {
          node {
            id
            originalSrc
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            price
            displayName
          }
        }
      }
      metafield(namespace: "sync", key: "productData") {
        value
        id
      }
    }
  }
}
`;

exports.PRODUCT_UPDATE = `mutation productMetaUpdate($input: ProductInput!) {
  productUpdate(input: $input) {
    product {
      metafields(first: 100) {
        edges {
          node {
            id
            namespace
            key
            value
          }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
  `;

const CUSTOMER_ADDRESS_QUERY = `
  firstName
  lastName
  address1
  address2
  company
  phone
  city
  country
  province
  zip
`;

exports.CUSTOMER_CHECKOUT_QUERY = `
mutation associateCustomerWithCheckout($checkoutId: ID!, $customerAccessToken: String!) {
  checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
    checkout {
      id
    }
    checkoutUserErrors {
      code
      field
      message
    }
    customer {
      id
    }
  }
}
`;

exports.CUSTOMER_QUERY = `query customerQuery($customerAccessToken: String!){
  customer(customerAccessToken: $customerAccessToken) {
    firstName
    lastName
    acceptsMarketing
    phone
    email
    defaultAddress {
      ${CUSTOMER_ADDRESS_QUERY}
    }
    orders(first:100){
      edges{
        node{
          orderNumber
          totalPrice
          processedAt
          statusUrl
          successfulFulfillments(first: 100){
            trackingInfo(first: 100){
              number
              url
            }
          }
          lineItems(first:100){
            edges{
              node{
                quantity
                title
                variant{
                  title
                  price
                  image{
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

exports.CUSTOMER_TOKEN_QUERY = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    userErrors {
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}
`;

exports.CUSTOMER_RECOVERY_QUERY = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    userErrors {
      field
      message
    }
  }
}`;

exports.CUSTOMER_LOGOUT_QUERY = `mutation customerAccessTokenDelete($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    userErrors {
      field
      message
    }
    deletedAccessToken
    deletedCustomerAccessTokenId
  }
}`;

exports.CUSTOMER_CREATE_QUERY = `mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    userErrors {
      field
      message
    }
    customer {
      id
    }
    customerUserErrors {
      field
      message
    }
  }
}`;

exports.CUSTOMER_RESET_QUERY = `mutation customerReset($id: ID!, $input: CustomerResetInput!) {
  customerReset(id: $id, input: $input) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`;

exports.CUSTOMER_ACTIVATE_QUERY = `mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
  customerActivate(id: $id, input: $input) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`;
