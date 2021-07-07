import axios from 'axios';

const {CUSTOMER_QUERY} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');
const {SHOPIFY_GRAPHQL_URL} = process.env;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, '');
  let data;

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bad request body'});
  }

  const payload = preparePayload(CUSTOMER_QUERY, {
    customerAccessToken: data.token,
  });

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });
    customer = customer.data.data.customer;

    return statusReturn(200, {
      token: data.token,
      customer,
    });
  } catch (err) {
    console.log(err);
    return statusReturn(500, {error: err.message});
  }
};
