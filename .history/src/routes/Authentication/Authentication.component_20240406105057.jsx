import React from 'react'
import Login from '../../components/Login/';
import Signup from '../../components/Signup/Signup.component';
const Authentication = () => {
  return (
    <div className='authentication-container'>
      <Login/>
      <Signup/>
    </div>
  )
}

export default Authentication;
