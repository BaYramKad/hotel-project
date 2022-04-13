import React from 'react'
import { useSelector } from 'react-redux'

function useAuth() {
    const {email, token, uid} = useSelector(state => state.setUser)
    console.log('email, token, uid: ', email, token, uid);
  return {
    isAuth: !!email, 
    email, 
    token,
    uid
  }
}

export default useAuth
