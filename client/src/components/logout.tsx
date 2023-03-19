import React from 'react'
import { useMutation, gql } from '@apollo/client';

const Logout: React.FC = () => {
  const USER_LOGOUT = gql`
    mutation {
      logout
  }
  `

  const [Logout, { data, loading }] = useMutation(USER_LOGOUT);

  const handleOnLogoutClick = async () => {
    await Logout()
  }

  console.log(data)
  console.log(loading)

  return (
    <button type="submit" onClick={handleOnLogoutClick}>Logout</button>
  )
}

export default Logout