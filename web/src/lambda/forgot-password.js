import axios from 'axios';

const {CUSTOMER_RECOVERY_QUERY} = require('./queries');
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
    return statusReturn(400, {error: 'Bad Request Body'});
  }

  const payload = preparePayload(CUSTOMER_RECOVERY_QUERY, {
    email: data.email,
  });

  try {
    const customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });
    const {data, errors} = customer.data;
    const {customerRecover} = data;
    if (customerRecover && customerRecover.userErrors.length > 0) {
      throw customerRecover.userErrors;
    } else if (errors && errors.length > 0) {
      throw errors;
    } else {
      return statusReturn(200, {customerRecover});
    }
  } catch (err) {
    return statusReturn(500, {error: err[0].message});
  }
};
