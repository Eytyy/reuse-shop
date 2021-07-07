import React, {useState, useEffect} from 'react';
import cookie from 'js-cookie';
import {navigate} from 'gatsby';

const AuthWrapper = (props) => {
  const {component: Component, path, ...rest} = props;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!cookie.get('customer_token') || !cookie.get('customer_email')) {
      navigate('/account/login');
    }
    setReady(true);
  }, []);

  return ready ? <Component path={path} {...rest} /> : <span />;
};

export default AuthWrapper;
