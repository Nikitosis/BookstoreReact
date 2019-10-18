import React from "react";
import AuthenticationService from "../redux/services/AuthenticationService";
import {logoutUser} from "../redux/reducers/loginReducer";
import connect from "react-redux/lib/connect/connect";

function LogoutPage(props){
    return (
        <div className="conatiner">
            <div className="btn btn-primary" onClick={props.executeLogout}>Logout</div>
        </div>
    );
}

function mapDispatchToProps(dispatch){
    return{
        executeLogout:()=>dispatch(logoutUser()),
    }
}

export default connect(null,mapDispatchToProps)(LogoutPage);