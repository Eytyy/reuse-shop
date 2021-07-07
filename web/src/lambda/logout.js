import axios from 'axios';

const {CUSTOMER_LOGOUT_QUERY} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');
const {SHOPIFY_GRAPHQL_URL} = process.env;

let data;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, '');

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return statusReturn(400, {error: 'Bad Request Body'});
  }

  const payload = preparePayload(CUSTOMER_LOGOUT_QUERY, {
    customerAccessToken: data.accessToken,
  });

  try {
    let logout = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });
    return statusReturn(200, '');
  } catch (err) {
    return statusReturn(500, {error: err[0]});
  }
};
