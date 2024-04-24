import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Navbar/Navbar.component';
import HomeProp from '../../components/homeProp/HomeProp.component';
const Home  = () => {
  return (
    <div>
       <Nav/>
       <HomeProp className="Home-container" />
       <Outlet/>
    </div>
  )
}

export  default Home;
