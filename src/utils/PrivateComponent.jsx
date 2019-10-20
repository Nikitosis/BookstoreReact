import React from 'react';
import AuthenticationService from "../redux/services/AuthenticationAPI";
import connect from "react-redux/lib/connect/connect";

function PrivateComponent(props){
        let currentUser=props.curUser;

        if(props.nonAuthorised && !props.isLogged){
            return props.children;
        }

        if (!props.isLogged) {
            // not logged in so redirect to authentication page with the return url
            return null;
        }

        // check if route is restricted by role
        let isRolePass=false;
        let accessRoles=props.roles!==undefined? props.roles : null;
        let userRoles=currentUser.roles.map(role=> role.name);
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
        return props.children;
}
function mapStateToProps(state){
    return{
        curUser:state.currentUserReducer.user,
        isLogged:state.loginReducer.isLogged
    }
}

export default connect(mapStateToProps,null)(PrivateComponent);