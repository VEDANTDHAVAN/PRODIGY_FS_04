/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { userContext } from '../context/user.context'

const Home = () => {

  const {user} = useContext(userContext)
  return (
    <div>{JSON.stringify(user)}</div>
  )
}

export default Home