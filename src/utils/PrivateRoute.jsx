import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

export const PrivateRoute = ({ component: Component, roles,nonAuthorised, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = AuthenticationService.getCurrentUser();

        if(nonAuthorised &&!currentUser){
            return <Component {...props} />
        }

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        let isRolePass=false;
        let accessRoles=roles;
        let userRoles=currentUser.roles.split(",");
        for(let i=0;i<userRoles.length;i++){
            if(accessRoles && accessRoles.indexOf(userRoles[i])!=-1){
                isRolePass=true;
                break;
            }
        }

        if (!accessRoles) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)