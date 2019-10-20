import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from "../redux/services/AuthenticationService";
import connect from "react-redux/lib/connect/connect";

const PrivateRoute = ({ component: Component, roles,nonAuthorised,currentUser,isLogged, ...rest }) => (
    <Route {...rest} render={props => {
        //not logged in, but nonAuthorised flag
        debugger;
        if(nonAuthorised && !isLogged){
            return <Component {...props} />
        }
        // not logged in so redirect to login page with the return url
        if (!isLogged) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        let isRolePass=false;
        let accessRoles=roles;
        let userRoles=currentUser.roles.map(role=> role.name);
        for(let i=0;i<userRoles.length;i++){
            if(accessRoles && accessRoles.indexOf(userRoles[i])!==-1){
                isRolePass=true;
                break;
            }
        }

        // role not authorised so redirect to home page
        if (!isRolePass) {
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)

function mapStateToProps(state){
    debugger;
    return{
        currentUser:state.currentUserReducer.user,
        isLogged:state.loginReducer.isLogged,
    }
}

export default connect(mapStateToProps)(PrivateRoute);