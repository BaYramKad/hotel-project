import React from 'react'
import { Redirect } from 'react-router-dom';

import { removeUserAction }  from '../../redux/redusers/setUser'

import useAuth from '../../hooks/useAuth'
import { useDispatch } from "react-redux";

function RoomsTablePage() {
  const dispatch = useDispatch()
  const { isAuth,  email } = useAuth()

  return isAuth ? <div>
     <h1>Welcome</h1> 
    <button onClick={() => dispatch(removeUserAction()) }> For log out {email} </button>
  </div>  : (
    <Redirect to='/login' />
  )
}
export default RoomsTablePage
