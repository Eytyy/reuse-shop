import React, {useCallback} from 'react';
import fetch from 'unfetch';
import {Link, navigate} from 'gatsby';
import Helmet from 'react-helmet';
import {useLoads} from 'react-loads';

import {useSetCustomer} from '../../context/siteContext';
import UpdateCustomer from '../../lib/updateCustomer';
import ErrorHandling from '../../lib/errorHandling';

const Login = ({path}) => {
  const updateCustomerInState = useSetCustomer();
  const form = React.createRef();

  const handleLogin = useCallback(
    (email, password) =>
      fetch(`/.netlify/functions/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error);
          } else {
            UpdateCustomer(res, email);
            setTimeout(() => {
              updateCustomerInState();
              navigate('/account');
            }, 400);
            return null;
          }
        }),
    []
  );

  const {error, isRejected, isPending, isReloading, load} = useLoads(
    'handleLogin',
    handleLogin,
    {
      defer: true,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, password} = form.current.elements;

    load(email.value, password.value);
  };

  return (
    <div>
      <Helmet title='login' />
      <form onSubmit={(e) => handleSubmit(e)} ref={form}>
        <h5>Log In</h5>

        <div>
          {(isPending || isReloading) && <span>Loading</span>}

          {isRejected && <ErrorHandling error={error.message} />}

          <div>
            <div>Email</div>
            <input
              name='email'
              type='text'
              required={true}
              placeholder='Enter Email'
            />
          </div>
          <div>
            <input
              name='password'
              type='password'
              required={true}
              placeholder='Enter Password'
            />
          </div>
          <div>
            <button type='submit'>
              {isPending || isReloading ? (
                <span>Loading</span>
              ) : (
                <span>Log in</span>
              )}
            </button>
          </div>
        </div>

        <div>
          <p>
            <Link to='/account/forgot'>Forgot password?</Link>
          </p>
          <p>
            Don't have an account? <Link to='/account/register'>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
