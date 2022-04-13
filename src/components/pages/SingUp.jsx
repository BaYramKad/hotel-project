import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormUser from '../FormUser'
import { setUserAction } from '../../redux/redusers/setUser'

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function SingUp() {
    const dispatch = useDispatch()
    const { push } = useHistory()
    const auth = getAuth();

    const hendleSingUp = async (email, password) => {
      onAuthStateChanged(auth, (user) => {
        console.log('user: ', user);
        if (user.email !== email) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
              dispatch(setUserAction({
                email: user.email,
                token: user.accessToken,
                uid: user.uid
              }))
              push('/layout')
            })
            .catch((error) => {
              console.log(error);
          });
        } else {
          push('/')
        }
      });
      
    }

  return (<>
    <FormUser 
          title='SignUp'
          status='Registration'
          hendleClick={hendleSingUp}
      />
      <p> or <Link to='/'>Log In</Link></p>
  </>
    
  )
}

export default  SingUp