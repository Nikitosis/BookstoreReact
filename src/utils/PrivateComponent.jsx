import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from "../services/AuthenticationService";

class PrivateComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const currentUser = AuthenticationService.getCurrentUser();
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return null;
        }

        // check if route is restricted by role
        let isRolePass=false;
        let accessRoles=this.props.roles!=undefined? this.props.roles : null;
        let userRoles=currentUser.roles.split(",");
        for(let i=0;i<userRoles.length;i++){
            if(accessRoles && accessRoles.indexOf(userRoles[i])!=-1){
                isRolePass=true;
                break;
            }
        }

        if (accessRoles && !isRolePass) {
            // role not authorised so redirect to home page
            return null;
        }

        // authorised so return component
        return this.props.children;
    }
}
export default PrivateComponent;