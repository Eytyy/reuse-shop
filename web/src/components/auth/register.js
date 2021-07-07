import React, {useState, useCallback} from 'react';
import Helmet from 'react-helmet';
import fetch from 'unfetch';
import {Link, navigate} from 'gatsby';
import {useLoads} from 'react-loads';
import Timeout from 'await-timeout';

import ErrorHandling from '../../lib/errorHandling';
import UpdateCustomer from '../../lib/updateCustomer';
import {PasswordSchema} from '../../lib/passwordSchema';

const Register = ({path}) => {
  const [passwordField1, setPasswordField1] = useState('');
  const [passwordField2, setPasswordField2] = useState('');
  const form = React.createRef();
  const [attempts, setAttempts] = useState(0);

  const handleRegister = useCallback(
    async (email, password, firstName, lastName) => {
      setAttempts(attempts + 1);

      if (!PasswordSchema.validate(passwordField1)) {
        throw new Error(
          'Your password should be between 8 and 100 characters, and have at least one lowercase and one uppercase letter.'
        );
      }

      if (passwordField1 !== passwordField2) {
        await Timeout.set(400);
        throw new Error('Passwords do not match.');
      }

      const res = await fetch(`/.netlify/functions/register`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });

      try {
        const customer = await res.json();

        if (customer.error) {
          throw new Error(customer.error);
        } else {
          UpdateCustomer(customer, email);
          // re-hydrate the cart so it contains the email
          // checkout.hydrate()
          setTimeout(() => {
            navigate('/');
          }, 400);
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    [passwordField1, passwordField2, attempts]
  );

  const {error, isRejected, isPending, isReloading, load} = useLoads(
    'handleRegister',
    handleRegister,
    {
      defer: true,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password, firstName, lastName} = form.current.elements;
    load(email.value, password.value, firstName.value, lastName.value);
  };

  return (
    <div>
      <Helmet title='create account' />
      <div>
        <form onSubmit={(e) => handleSubmit(e)} ref={form}>
          <div>
            <h5>Sign Up</h5>
          </div>

          {(isPending || isReloading) && <span>Loading</span>}

          {isRejected && <ErrorHandling error={error.message} />}

          <div>
            <div>
              <div>First Name</div>
              <input
                name='firstName'
                type='text'
                required={true}
                placeholder='First Name'
              />
            </div>
            <div>
              <div>Last Name</div>
              <input
                name='lastName'
                type='text'
                required={true}
                placeholder='Last Name'
              />
            </div>
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
              <div>Password</div>
              <p>
                (Must be at least 8 characters long and include a both a
                lowercase and uppercase letter).
              </p>
              <input
                name='password'
                value={passwordField1}
                onChange={(e) => setPasswordField1(e.target.value)}
                type='password'
                required={true}
                placeholder='Password'
              />
            </div>
            <div>
              <div>Confirm Password</div>
              <input
                name='passwordConfirm'
                value={passwordField2}
                onChange={(e) => setPasswordField2(e.target.value)}
                type='password'
                required={true}
                placeholder='Verify Password'
              />
            </div>
          </div>

          <div>
            <button type='submit'>
              {isPending || isReloading ? (
                <span>Loading</span>
              ) : (
                <span>Submit</span>
              )}
            </button>
            <p className='py1 s14'>
              Already have an account?{' '}
              <Link className='underline active' to='/account/login'>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
