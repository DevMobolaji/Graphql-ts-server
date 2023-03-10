import React from 'react'
import { useQuery, gql } from '@apollo/client';

const Cart = () => {
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


  const { data, error, loading } = useQuery(LOGIN_USER)
  
    if (loading || !data) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const res = data.carts.map((cart) => cart)
  console.log(res)
  const dt = res.map((item) => item)
  console.log(dt)
  // const res = data.carts.map((cart) => (
  //       <li key={cart.id}>
  //         <h3>Cart #{cart.id}</h3>
  //         <ul>
  //           {cart.cartItems.map((item) => (
  //             <li key={item.id}>
  //               {item.product.name} x {item.quantity} (${item.product.price})
  //             </li>
  //           ))}
  //         </ul>
  //       </li>
  // ))
  // console.log(res)
  return (
    <ul>
      {}
    </ul>
  );
}

export default Cart