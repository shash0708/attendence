import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Navbar/Navbar.component';
const Home  = () => {
  return (
    <div>
       I am Home
       <Outlet/>
    </div>
  )
}

export  default Home;
