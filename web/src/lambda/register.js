require('dotenv').config();

import axios from 'axios';

const {CUSTOMER_TOKEN_QUERY, CUSTOMER_CREATE_QUERY} = require('./queries');
const {preparePayload, statusReturn} = require('./helpers');
const {shopifyConfig} = require('./config');
const {SHOPIFY_GRAPHQL_URL} = process.env;

export const handler = async (event) => {
  console.log('hello from reg lambda');

  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '');
  }

  let data;

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bad request body'});
  }

  console.log(`[λ: new account]`, {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
  });

  const payload = preparePayload(CUSTOMER_CREATE_QUERY, {
    input: {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  try {
    let customer = await axios({
      url: SHOPIFY_GRAPHQL_URL,
      method: 'POST',
      headers: shopifyConfig,
      data: JSON.stringify(payload),
    });

    if (customer.data.errors) throw customer.data.errors[0];

    const {customerCreate} = customer.data.data;

    if (customerCreate.userErrors.length > 0)
      throw customerCreate.userErrors[0];

    // If that was successful lets log our new user in
    const loginPayload = preparePayload(CUSTOMER_TOKEN_QUERY, {
      input: {
        email: data.email,
        password: data.password,
      },
    });

    try {
      let token = await axios({
        url: SHOPIFY_GRAPHQL_URL,
        method: 'POST',
        headers: shopifyConfig,
        data: JSON.stringify(loginPayload),
      });
      const {customerAccessTokenCreate} = token.data.data;
      if (customerAccessTokenCreate.userErrors.length > 0) {
        throw customerAccessTokenCreate.userErrors;
      } else {
        token = customerAccessTokenCreate.customerAccessToken.accessToken;
        // Manipulate the response and send some customer info back down that we can use later
        return statusReturn(200, {
          token,
          customer: {
            firstName: data.firstName,
            lastName: data.lastName,
          },
        });
      }
    } catch (err) {
      console.log('error creating');
      return statusReturn(500, {error: err[0].message});
    }
  } catch (err) {
    console.log('error loging in');
    console.log(err);
    return statusReturn(500, {error: err.message});
  }
};
