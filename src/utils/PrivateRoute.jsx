import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthenticationService.getCurrentUser();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        let isRolePass=false;
        for(let curRole in currentUser.roles){
            if(roles && roles.indexOf(curRole)!=-1){
                isRolePass=true;
                break;
            }
        }

        if (roles && !isRolePass) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)