

import React from 'react';
import { Redirect, Route } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest } component= {(props) => {
        
        // This one is constanly reading when the token dies so as to act UPON
        const token = window.localStorage.getItem('token');

        if( token ){

            return <Component { ...props } />
        }else {
            return <Redirect to={ `/signin`} />
        }
    }} />
}