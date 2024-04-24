import React, { Fragment,Link } from 'react'
import { ReactComponent as HomeLogo } from '../../assests/home.svg'
import ButtonProp from '../Button/Button.component'
import Login from '../Login/Login.component';
import './HomeProp.styles.scss';
const HomeProp= () => {
  return (
    <Fragment >

<div className='text-container'>
    <h1>Automated Attendence  System</h1>
   
    </div>
    <div className='revolutionze'>
    <p>Revoultinze every step</p>
    </div>
    <div className='button-prop'>
    <ButtonProp/>

        </div>

      <HomeLogo className='home-prop'/>
    </Fragment>
  )
}

export default HomeProp;
