import React from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import FormUser from '../FormUser';
import { setUserAction } from '../../redux/redusers/setUser'


function SingIn(users) {
    const dispatch = useDispatch()
    const { push } = useHistory()
    const auth = getAuth();
      
    const hendleSingIn = (email, password) => {
      let countError = 0
        try {
          for(let value in users) {
            countError++
            if(email === users[value].email) {
              signInWithEmailAndPassword(auth, email, password)
                .then(({user}) => {
                    dispatch(setUserAction({
                      email: user.email,
                      token: user.accessToken,
                      uid: user.uid
                    }))
                    push('/rooms')
                })
                .catch((error) => {
                  alert('error: ', error);
                });
                break
            } else {
                if(countError === Object.keys(users).length) throw "Error blat"
            }
          }

        } catch (error) {
          alert(error)
        }
          
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
