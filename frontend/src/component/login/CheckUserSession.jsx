import store from '../../store.js'
import React from 'react'

const checkUserSession = async () => {
    const response = await fetch("/auth/isvalid", { credentials: "include" }); 
   const data = await response.json();
    store.dispatch({type: "CheckIfUserValid", isValidUser: data.status})
}

export default checkUserSession