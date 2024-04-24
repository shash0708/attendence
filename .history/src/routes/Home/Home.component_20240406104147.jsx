import React from 'react'
import { Outlet } from 'react-router-dom';

const Home  = () => {
  return (
    <div>
       I am Home
       <Outlet/>
    </div>
  )
}

export  default Home;
