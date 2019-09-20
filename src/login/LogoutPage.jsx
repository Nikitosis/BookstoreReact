import React from "react";
import AuthenticationService from "../services/AuthenticationService";

class LogoutPage extends React.Component{

    onLogoutClick=()=>{
        AuthenticationService.executeLogout();
        this.props.history.push("/login");
        window.location.reload(true);
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