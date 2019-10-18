import React from "react";
import AuthenticationService from "../redux/services/AuthenticationService";

class LogoutPage extends React.Component{

    onLogoutClick=()=>{
        AuthenticationService.executeLogout();
    }

    render() {
        return (
            <div className="conatiner">
                <div className="btn btn-primary" onClick={this.onLogoutClick}>Logout</div>
            </div>
        );
    }
}

export default LogoutPage;