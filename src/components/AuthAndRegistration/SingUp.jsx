import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import FormUser from '../FormUser'
import { setUserAction } from '../../redux/redusers/setUser'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


function SingUp(users) {
    const dispatch = useDispatch()
    const { push } = useHistory()
    const auth = getAuth();

    const hendleSingUp = async (email, password) => {
      const db = getDatabase();
      let countError = 0
      try {
        for(let value in users) {
          countError++
          if(email !== users[value].email) {
            createUserWithEmailAndPassword(auth, email, password)
              // eslint-disable-next-line no-loop-func
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
                  set(ref(db, 'Accounts/' +  user.uid), { 
                    email: user.email,
                    uid: user.uid 
                  });
                  push('/rooms')
              })
              break
          } else {
            push('/login')
            if(countError !== Object.keys(users).length) throw 'Email-already-in-use'
          }
        }
      } catch (error) {
        alert(error)
      }
    }

  return (<>
    <FormUser 
          title='SignUp'
          status='Registration'
          hendleClick={hendleSingUp}
      />
      
  </>
  )
}

export default  SingUp