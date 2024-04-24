import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Navbar/Navbar.component';
import HomeProp from '../../components/homeProp/HomeProp.component';
import './Home.styles.scss'
const Home  = () => {
  return (
    <div>
       <Nav/>
<section></section>
       <HomeProp/>

       <Outlet/>
    </div>
  )
}

export  default Home;
