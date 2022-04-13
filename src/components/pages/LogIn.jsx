import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import FormUser from '../FormUser';
import { setUserAction } from '../../redux/redusers/setUser'

function SingIn() {

    const dispatch = useDispatch()
    const { push } = useHistory()
    const auth = getAuth();

    const hendleSingIn = (email, password) => {
      onAuthStateChanged(auth, (user) => {
          if(user.email === email) {
            signInWithEmailAndPassword(auth, email, password)
              .then(({user}) => {
                  dispatch(setUserAction({
                    email: user.email,
                    token: user.accessToken,
                    uid: user.uid
                  }))
                  push('/layout')
              })
              .catch((error) => {
                alert('error: ', error);
              });
          } else {
            alert('Invalid username or password')
            // push('/register')
          }
      })


      
    }

  return (<>
    <FormUser
          title='LogIn'
          status='Authorization'
          hendleClick={hendleSingIn}
      />
    <p> or <Link to='/register'>Register</Link></p>
  </>)
}

export default  SingIn
