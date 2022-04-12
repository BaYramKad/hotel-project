import React from 'react'
import FormUser from './FormUser';
import { signInWithEmailAndPassword } from '../../firebase'
function SingIn() {
    const hendleSingIn = (values) => {
        console.log('valuesSignIn: ', values);
        // signInWithEmailAndPassword()
    }
  return (
    <FormUser
        title='SignIn'
        hendleClick={hendleSingIn}
    />
  )
}

export default  SingIn
