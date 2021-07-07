import axios from 'axios';

const {statusReturn} = require('./helpers');

let data;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST' || !event.body) return statusReturn(400, {});

  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log('JSON parsing error:', error);
    return statusReturn(400, {error: 'Bad Request Body'});
  }

  const {accountId, email, platform, variant} = data;

  const stringData = `a=${accountId}&email=${encodeURIComponent(
    email
  )}&variant=${variant}&platform=${platform}`;
  try {
    let subscription = await axios({
      url: 'https://a.klaviyo.com/api/v1/catalog/subscribe',
      method: 'POST',
      data: stringData,
    });

    return statusReturn(200, subscription.data);
  } catch (err) {
    console.log(err);
    return statusReturn(500, {error: err.message});
  }
};
