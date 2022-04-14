import React from 'react'
import { useSelector } from 'react-redux'

function useAuth() {
    const {email, token, uid} = useSelector(state => state.setUser)
  return {
    isAuth: !!email, 
    email, 
    token,
    uid
  }
}

export default useAuth
