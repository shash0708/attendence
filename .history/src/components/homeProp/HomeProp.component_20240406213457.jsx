import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ReactComponent as HomeLogo } from '../../assests/home.svg';
import ButtonProp from '../Button/Button.component';
import Login from '../Login/Login.component';
import './HomeProp.styles.scss';

const HomeProp = () => {
  return (
    <Fragment>
      <div className='text-container'>
        <h1>Automated Attendance System</h1>
      </div>
      <div className='revolutionze'>
        <p>Revolutionize every step</p>
      </div>
      <div className='button-prop'>
        <Link className='button' to='/form'>Get Started</Link> {/* Correct usage of Link */}
      </div>
      <HomeLogo className='home-prop'/>
    </Fragment>
  );
}

export default HomeProp;
