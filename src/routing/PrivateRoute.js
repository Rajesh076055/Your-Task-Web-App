import React from 'react'
import {Navigate, Route} from 'react-router-dom';

function PrivateRoute({component:Component,...rest}) {
  return (
    <Route
    {...rest}
    render = {
        (props) => {
            localStorage.getItem("authToken") ? (
                <Component {...props}/>
            ):(
                <Navigate to = '/login'/>
            )
        }
    }

    >

    </Route>
    
  )
}

export default PrivateRoute