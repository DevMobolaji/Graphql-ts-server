import React from 'react'
import { useQuery, gql } from '@apollo/client';

const Login = () => {
    const LOGIN_USER = gql`
    query {
    carts {
        id
      cartItem {
          id
          product {
              name
              quantity
              price
              image
          }
          quantity
      }
    }
}
  `
    const { loading, data, error } = useQuery(LOGIN_USER)
    console.log(error)
    console.log(loading)
    console.log(data)
    if (loading) {
        return <div><h2>loading</h2></div>
    }
    return (
    
    <div>login</div>
  )
}

export default Login