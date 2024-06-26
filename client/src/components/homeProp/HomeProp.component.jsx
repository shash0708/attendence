import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HomeProp.styles.scss';

const HomeProp = () => {
  return (
    <Fragment>
    <div className='Homeprop'>
      <div className='text-container'>
        <h1>Automated Attendance System</h1>
      </div>
      <div className='revolutionze'>
        <p>Revolutionize every step</p>
      </div>
      <div className='button-prop'>
        <Link className='gutton' to='/form'>Get Started</Link> {/* Correct usage of Link */}
      </div>
   
      </div>
    </Fragment>
  );
}

export default HomeProp;
