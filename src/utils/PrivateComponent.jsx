import React from 'react';
import AuthenticationService from "../services/AuthenticationService";

class PrivateComponent extends React.Component{
    render() {
        const currentUser = AuthenticationService.getCurrentUser();

        if(this.props.nonAuthorised &&!currentUser){
            return this.props.children;
        }

        if (!currentUser) {
            // not logged in so redirect to authentication page with the return url
            return null;
        }

        // check if route is restricted by role
        let isRolePass=false;
        let accessRoles=this.props.roles!==undefined? this.props.roles : null;
        let userRoles=currentUser.roles.split(",");
        for(let i=0;i<userRoles.length;i++){
            if(accessRoles && accessRoles.indexOf(userRoles[i])!==-1){
                isRolePass=true;
                break;
            }
        }

        if (!isRolePass) {
            // role not authorised so redirect to home page
            return null;
        }

        // authorised so return component
        return this.props.children;
    }
}
export default PrivateComponent;