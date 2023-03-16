import React from 'react'
import { useQuery, gql } from '@apollo/client';

const Cart = (): JSX.Element => {
  const LOGIN_USER = gql`
    query {
    carts {
      cartItem {
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

  const { data, error, loading } = useQuery(LOGIN_USER)

  const listItems = data.carts.map((d: { cartItem: { quantity: number | React.Key | null | undefined; product: { name: string | null | undefined; price: string | number | boolean | null | undefined; }; }; }) =>
    <li key={d.cartItem.quantity}>
      {d.cartItem.product.name} - {d.cartItem.product.price} - {d.cartItem.quantity}
    </li>);

  return (
    <>
      {error ? <p>Oh no! {error.message}</p> : null}
      {loading || !data ? <p>Loading</p> : null}
      <h1>Hello world</h1>
      <ul>
        {listItems}
      </ul>
    </>
  )
}

export default Cart