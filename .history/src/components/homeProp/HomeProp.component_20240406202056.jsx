import React, { Fragment } from 'react'
import { ReactComponent as HomeLogo } from '../../assests/home.svg'
import './HomeProp.styles.scss';
const HomeProp= () => {
  return (
    <Fragment>
<div className='text-container'>
    <h1>Automated Attendence  System</h1>
    <div className=''>
    <p>Revoultinze every step</p>
    </div>
    </div>
    <p>Revoultinze every step</p>
    
      <HomeLogo className='home-prop'/>
    </Fragment>
  )
}

export default HomeProp;
