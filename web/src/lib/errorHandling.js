import React from 'react';

const ErrorHandling = ({error}) => {
  return (
    <div>
      <span role='img' aria-label='error'>
        ⚠️
      </span>
      : {error}
    </div>
  );
};

export default ErrorHandling;
