import axios from 'axios';

const {CUSTOMER_ACTIVATE_QUERY} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');
const {SHOPIFY_GRAPHQL_URL} = process.env;

let data;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, '');

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bady Request Body'});
  }

  const payload = preparePayload(CUSTOMER_ACTIVATE_QUERY, {
    id: data.id,
    input: data.input,
  });

  try {
    const customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });
    if (customer.data.data.customerActivate.userErrors.length > 0) {
      throw customer.data.data.customerActivate.userErrors;
    } else {
      const cusRes = customer.data.data.customerActivate;
      return statusReturn(200, {data: cusRes});
    }
  } catch (err) {
    return statusReturn(500, {error: err[0].message});
  }
};
