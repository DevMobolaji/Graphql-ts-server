import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const USER_LOGIN = gql`
    mutation Login($input: CreateUserInput!) {
      Login(input: $input) {
          message
          path
      }
    }
  `
  const [Login] = useMutation(USER_LOGIN);
  
  function handleSubmit(event) {
  event.preventDefault();

  Login({ variables: {
    "input": {
      "email": email,
      "password": password
    }
}})
    .then(result => {
      console.log(result.data);
      // Handle successful form submission here
    })
    .catch(error => {
      console.error(error);
      // Handle form submission error here
    });
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input type="email" value={email} onChange={event => setEmail( event.target.value )} />

      <label>password:</label>
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />


      <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default Login