import React from 'react';
import {navigate} from 'gatsby';
import cookie from 'js-cookie';
import fetch from 'unfetch';

import Orders from './orders';
import {useSetCustomer, useStore} from '../../context/siteContext';

const logout = (e, updateCustomer) => {
  e.preventDefault();
  const customerToken = cookie.get('customer_token');

  fetch(`/.netlify/functions/logout`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken: customerToken,
    }),
  }).then(() => {
    cookie.remove('customer_token');
    cookie.remove('customer_email');
    cookie.remove('customer_firstName');
    setTimeout(() => {
      updateCustomer();
    }, 300);
    setTimeout(() => {
      navigate('/');
    }, 500);
  });
};

const Portal = () => {
  const updateCustomerInState = useSetCustomer();
  const {customerToken} = useStore();
  console.log(customerToken);
  return (
    <div>
      <h1>Account Portal</h1>
      <a href='#logout' onClick={(e) => logout(e, updateCustomerInState)}>
        Logout
      </a>
      <div>{customerToken && <Orders />}</div>
    </div>
  );
};

export default Portal;
