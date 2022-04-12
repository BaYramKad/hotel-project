import React from 'react'
import FormUser from './FormUser'
import {registerWithEmailAndPassword } from '../../firebase'

function SingUp() {

    const hendleSingUp = (values) => {
        console.log('valuesSingUp: ', values);
        // registerWithEmailAndPassword()
    }
  return (
    <FormUser 
        title='SignUp'
        hendleClick={hendleSingUp}
    />
  )
}

export default  SingUp