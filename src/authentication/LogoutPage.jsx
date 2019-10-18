import React from "react";
import {executeLogout} from "../redux/reducers/loginReducer";
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
        executeLogout:()=>dispatch(executeLogout()),
    }
}

export default connect(null,mapDispatchToProps)(LogoutPage);