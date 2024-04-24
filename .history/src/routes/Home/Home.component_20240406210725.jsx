import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/Navbar/Navbar.component';
import HomeProp from '../../components/homeProp/HomeProp.component';
import './Home.styles.scss'
const Home  = () => {
  return (
    <div>
       <Nav/>
<section className=''>
       <HomeProp/>
       </section>
       <Outlet/>
    </div>
  )
}

export  default Home;
