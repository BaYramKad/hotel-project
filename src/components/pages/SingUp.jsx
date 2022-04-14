import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormUser from '../FormUser'
import { setUserAction } from '../../redux/redusers/setUser'

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


function SingUp(users) {
    const dispatch = useDispatch()
    const { push } = useHistory()
    const auth = getAuth();

    const hendleSingUp = async (email, password) => {
      const db = getDatabase();
      for(let value in users) {
        if(email !== users[value].email) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUserAction({
                  email: user.email,
                  token: user.accessToken,
                  uid: user.uid
                }))
                set(ref(db, 'users/' + user.uid), { 
                  email: user.email,
                  uid: user.uid 
                });
                console.log('Отправили данные', user);
                push('/rooms')
            })
            break
        } else {
          push('/login')
          break
        }
      }
    }

  return (<>
    <FormUser 
          title='SignUp'
          status='Registration'
          hendleClick={hendleSingUp}
      />
      <p> or <Link to='/login'>Log In</Link></p>
  </>
    
  )
}

export default  SingUp