import React, { Fragment } from 'react'
import { ReactComponent as HomeLogo } from '../../assests/home.svg'
import './HomeProp.styles.scss';
const HomeProp= () => {
  return (
    <Fragment>
<div>
    <h1>Automated Attendence  System</h1>
      <HomeLogo className='home-prop'/>
    </Fragment>
  )
}

export default HomeProp;
