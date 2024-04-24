import React, { Fragment } from 'react'
import { ReactComponent as HomeLogo } from '../../assests/home.svg'
import './HomeProp.styles.scss';
const HomeProp= () => {
  return (
    <ragment>
<div className='text'>
    <h1>Automated Attendence  System</h1>
    </div>

      <HomeLogo className='home-prop'/>
    </ragment>
  )
}

export default HomeProp;
