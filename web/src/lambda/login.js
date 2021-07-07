import axios from 'axios';

const {CUSTOMER_TOKEN_QUERY, CUSTOMER_QUERY} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');
const {SHOPIFY_GRAPHQL_URL} = process.env;

let data;
let accessToken;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, {});

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bad Request Body'});
  }

  const payload = preparePayload(CUSTOMER_TOKEN_QUERY, {
    input: {
      email: data.email,
      password: data.password,
    },
  });

  try {
    const token = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });

    console.log(token);

    if (token.data.data.customerAccessTokenCreate.userErrors.length > 0) {
      throw token.data.data.customerAccessTokenCreate.userErrors;
    } else {
      accessToken =
        token.data.data.customerAccessTokenCreate.customerAccessToken
          .accessToken;
    }
  } catch (err) {
    console.log('error');
    console.log(err);
    return statusReturn(200, {error: 'Problem with email or password'});
  }

  const payloadCustomer = preparePayload(CUSTOMER_QUERY, {
    customerAccessToken: accessToken,
  });

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payloadCustomer),
    });

    customer = customer.data.data.customer;

    return statusReturn(200, {
      token: accessToken,
      customer,
    });
  } catch (err) {
    return statusReturn(500, {error: err.message});
  }
};
